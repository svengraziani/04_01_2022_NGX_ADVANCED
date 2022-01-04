import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from './passenger';

@Injectable({ providedIn: 'root' })
export class PassengerService {
  baseUrl = 'http://www.angular.at/api/passenger';

  constructor(private http: HttpClient) {}

  find(name: string, firstName: string = ''): Observable<Passenger[]> {
    return this.http.get<Passenger[]>('http://www.angular.at/api/passenger', {
      params: new HttpParams().set('firstName', firstName).set('name', name),
    });
  }

  save(passenger: Passenger) {
    return this.http.post<Passenger>(
      'http://www.angular.at/api/passenger',
      passenger
    );
  }
}
