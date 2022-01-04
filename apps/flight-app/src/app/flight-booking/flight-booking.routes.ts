import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth.guard';
import { CanDeactivateGuard } from '../shared/deactivation/can-deactivate.guard';
import { AirportComponent } from './airport/airport.component';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { SelectedFlightGuard } from './selected-flight.guard';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: 'flight-booking',
    component: FlightBookingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'flight-search',
        component: FlightSearchComponent,
      },
      {
        path: 'passenger-search',
        canActivate: [SelectedFlightGuard],
        component: PassengerSearchComponent,
      },
      {
        path: 'flight-edit/:id',
        canDeactivate: [CanDeactivateGuard],
        component: FlightEditComponent,
      },
      {
        path: 'airports',
        component: AirportComponent,
      },
    ],
  },
];
