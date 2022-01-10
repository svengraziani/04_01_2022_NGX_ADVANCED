import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import {
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  interval,
  merge,
  Observable,
  of,
  pairwise,
  pipe,
  retry,
  retryWhen,
  scan,
  share,
  startWith,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent {
  from = new FormControl();
  to = new FormControl();
  flights$: Observable<Flight[]>;
  diff$: Observable<number>;
  online = false;
  online$: Observable<boolean>;
  loading = false;
  basket$: Observable<Flight[]>;
  allFlights$: Observable<Set<Flight>>;
  private refreshClickSubject = new Subject<void>();
  refreshClick$ = this.refreshClickSubject.asObservable();
  private addToBasketSubject = new Subject<Flight>();
  addToBasket$: Observable<Flight> = this.addToBasketSubject.asObservable();

  constructor(private http: HttpClient) {
    this.online$ = interval(2000).pipe(
      startWith(0),
      map(() => Math.random() < 0.5),
      distinctUntilChanged(),
      tap((value) => (this.online = value))
    );

    const input$: Observable<{ from: string; to: string }> = combineLatest([
      this.from.valueChanges,
      this.to.valueChanges,
    ]).pipe(
      debounceTime(300),
      filter(([from, to]) => from.length >= 3 && to.length >= 3),
      map(([from, to]) => ({ from, to }))
    );

    const combined$ = combineLatest([input$, this.online$]).pipe(
      filter(([, online]) => online),
      map(([input]) => input),
      distinctUntilChanged(
        (prev, current) => prev.from === current.from && prev.to === current.to
      )
    );
    this.flights$ = merge(combined$, this.refreshClick$).pipe(
      tap(() => (this.loading = true)),
      switchMapBackoff(() => this.load(this.from.value, this.to.value)),
      tap(() => (this.loading = false)),
      share()
    );

    this.diff$ = this.flights$.pipe(
      pairwise(),
      map(([a, b]) => b.length - a.length)
    );

    this.basket$ = this.addToBasket$.pipe(
      scan((acc, flight) => [...acc, flight], [] as Flight[])
    );

    this.allFlights$ = this.flights$.pipe(
      scan((acc, flights) => new Set([...acc, ...flights]), new Set<Flight>())
    );
  }

  select(f: Flight) {
    this.addToBasketSubject.next(f);
  }

  refresh() {
    this.refreshClickSubject.next();
  }

  load(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams().set('from', from).set('to', to);

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, { params, headers });
  }
}

type Projector<T, U> = (item: T) => Observable<U>;

function switchMapCompensate<T, U>(projector: Projector<T, U>) {
  return (source$: Observable<T>) => {
    return source$.pipe(
      switchMap((p: T) => projector(p).pipe(catchError(() => of([]))))
    );
  };
}

function switchMapRetry<T, U>(projector: Projector<T, U>, retries = 1) {
  return (source$: Observable<T>) => {
    return source$.pipe(switchMap((p: T) => projector(p).pipe(retry(retries))));
  };
}

export interface SwitchMapRetryOptions {
  delayMsec: number;
  maxRetries: number;
}

const defaults: SwitchMapRetryOptions = {
  delayMsec: 500,
  maxRetries: 3,
};

export function switchMapBackoff<T, U>(
  projector: Projector<T, U>,
  { maxRetries, delayMsec }: SwitchMapRetryOptions = defaults
) {
  let i = 0;
  return pipe(
    switchMap((item: T) =>
      projector(item).pipe(
        retryWhen((err$) =>
          err$.pipe(
            switchMap((err) => {
              if (i++ >= maxRetries) {
                return throwError(() => err);
              }
              return of(err).pipe(delay(Math.pow(2, i) * delayMsec));
            })
          )
        )
      )
    )
  );
}
