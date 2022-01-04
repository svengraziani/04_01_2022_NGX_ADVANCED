/* eslint-disable no-restricted-syntax */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/auth/auth.service';
import { CanDeactivateComponent } from '../shared/deactivation/can-deactivate.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, CanDeactivateComponent {
  expertMode = false;
  needsLogin$: Observable<boolean> | undefined;
  acceptTerms = true;
  showAcceptTerms = false;
  username = '';
  password = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  get userName(): string {
    return this.authService.userName;
  }

  canDeactivate(): Observable<boolean> {
    if (!this.acceptTerms) {
      this.showAcceptTerms = true;
    }
    return of(this.acceptTerms);
  }

  changed($event: CustomEvent): void {
    console.debug('$event.detail ', $event.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit() {
    this.needsLogin$ = this.route.params.pipe(
      map((params) => !!params['needsLogin'])
    );
  }

  login(): void {
    this.authService.login(this.username, this.password);
  }

  logout(): void {
    this.authService.logout();
  }
}
