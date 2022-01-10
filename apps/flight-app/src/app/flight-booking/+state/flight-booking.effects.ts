import { Injectable } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  flightsLoaded,
  loadFlights,
  loadFlightsError,
} from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {
  loadFlights = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFlights),
      switchMap((a) =>
        this.flightService.find(a.from, a.to, a.urgent).pipe(
          map((flights) => flightsLoaded({ flights })),
          catchError(() => of(loadFlightsError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private flightService: FlightService
  ) {}
}
