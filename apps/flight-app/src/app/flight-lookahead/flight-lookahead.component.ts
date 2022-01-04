import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent {

  constructor(private http: HttpClient) {
  
  }

}
