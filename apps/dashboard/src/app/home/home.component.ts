import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  value1 = true;

  changed($event: unknown) {
    const customEvent = $event as CustomEvent;
    this.value1 = customEvent.detail;
  }
}
