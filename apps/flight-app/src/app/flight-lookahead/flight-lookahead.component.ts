import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent {

  control = new FormControl();
flights$: Observable<Flight[]>
loading = false;  

  constructor(private http: HttpClient) {
    this.flights$ = 
            this.control
                .valueChanges
                .pipe(
                    debounceTime(300),
                    tap(input => this.loading = true),
                    switchMap(input => this.load(input)),
                    tap(v => this.loading = false)
                );
  
  }

  load(from: string):Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});

};

}
