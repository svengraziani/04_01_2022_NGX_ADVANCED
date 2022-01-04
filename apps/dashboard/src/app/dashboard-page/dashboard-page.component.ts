/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { ExternalDashboardTileService } from './external-dashboard-tile.service';

@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  constructor(private externalService: ExternalDashboardTileService) {}

  addTile(): void {
    this._add('dashboard-tile');
  }

  addExternal(): void {
    this.externalService.load();
    this._add('external-dashboard-tile');
  }

  private _add(elementName: string): void {
    const data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];

    const content = document.getElementById('content');
    if (!content) {
      return;
    }

    const element = document.createElement(elementName);
    element.setAttribute('a', '4');
    element.setAttribute('b', '5');
    element.setAttribute('c', '6');
    element.className = 'col-lg-4 col-md-3 col-sm-2';
    content.appendChild(element);
  }
}
