import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accounts = [
    ['Max', ''],
    ['Susi', 'Sorglos'],
  ];
  userName = 'Max';

  constructor() {}

  login(username: string, password: string) {
    if (this.accounts.some(([u, p]) => username === u && p === password)) {
      this.userName = username;
    }
  }

  logout() {
    this.userName = '';
  }
}
