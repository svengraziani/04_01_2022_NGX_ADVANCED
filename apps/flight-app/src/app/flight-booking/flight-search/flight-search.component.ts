/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { selectFlightsWithProps } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent {
  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;
  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true,
  };
  flights$ = this.store.select(selectFlightsWithProps({ blackList: [3] }));

  constructor(
    private store: Store<FlightBookingAppState>,
    private flightService: FlightService
  ) {}

  get flights() {
    return this.flightService.flights;
  }

  search(): void {
    if (!this.from || !this.to) return;
    this.store.dispatch(
      loadFlights({
        from: this.from,
        to: this.to,
        urgent: this.urgent,
      })
    );
  }

  delay(): void {
    this.flights$.pipe(take(1)).subscribe((flights) => {
      const flight = flights[0];

      const oldDate = new Date(flight.date);
      const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const newFlight = { ...flight, date: newDate.toISOString() };

      this.store.dispatch(updateFlight({ flight: newFlight }));
    });
  }

  selectFlight(flight: Flight) {
    this.flightService.selectedFlight = flight;
  }
}
