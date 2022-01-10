import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './flight-booking.reducer';

export const selectFlightBooking =
  createFeatureSelector<State>('flightBooking');

export const selectFlights = createSelector(
  selectFlightBooking,
  (s) => s.flights
);

export const negativeList = createSelector(
  selectFlightBooking,
  (s) => s.negativeList
);

export const selectedFilteredFlights = createSelector(
  selectFlights,
  negativeList,
  (flights, negativeList) => flights.filter((f) => !negativeList.includes(f.id))
);

export const selectFlightsWithProps = (props: { blackList: number[] }) =>
  createSelector(selectFlights, (flights) =>
    flights.filter((f) => !props.blackList.includes(f.id))
  );
