import { Component, ViewEncapsulation } from '@angular/core';
import { Passenger, PassengerService } from '@flight-workspace/passenger-api';

@Component({
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PassengerSearchComponent {
  name = '';
  firstName = '';
  passengers: Passenger[] = [];
  selectedPassenger: Passenger | undefined;

  constructor(private passengerService: PassengerService) {}

  search() {
    this.passengerService
      .find(this.name, this.firstName)
      .subscribe((passengers) => (this.passengers = passengers));
  }

  select(passenger: Passenger) {
    this.selectedPassenger = passenger;
  }

  savePassenger() {
    if (this.selectedPassenger) {
      this.passengerService
        .save(this.selectedPassenger)
        .subscribe(() => (this.selectedPassenger = undefined));
    }
  }
}
