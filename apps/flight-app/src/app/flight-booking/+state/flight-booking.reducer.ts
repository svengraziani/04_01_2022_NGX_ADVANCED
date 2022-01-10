import { Flight } from '@flight-workspace/flight-lib';
import { createReducer } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import { flightsLoaded, updateFlight } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
  negativeList: number[];
}

export const initialState: State = {
  flights: [],
  negativeList: [3],
};

export interface FlightBookingAppState {
  flightBooking: State;
}

export const flightBookingReducer = createReducer(
  initialState,

  immerOn(flightsLoaded, (state, action) => {
    state.flights = action.flights;
  }),
  immerOn(updateFlight, (state, action) => {
    const flight = action.flight;
    state.flights = state.flights.map((f) => (f.id === flight.id ? flight : f));
  })
);
