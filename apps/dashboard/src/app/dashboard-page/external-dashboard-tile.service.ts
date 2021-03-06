import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExternalDashboardTileService {
  loaded = false;

  load(): void {
    if (this.loaded) return;
    this.loaded = true;

    const script = document.createElement('script') as HTMLScriptElement;
    script.src = 'assets/external-dashboard-tile.bundle.js';
    document.head.appendChild(script);
  }
}
