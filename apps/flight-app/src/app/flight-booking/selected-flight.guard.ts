import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { FlightService } from '@flight-workspace/flight-lib';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectedFlightGuard implements CanActivate {
  constructor(private flightService: FlightService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return of(!!this.flightService.selectedFlight);
  }
}
