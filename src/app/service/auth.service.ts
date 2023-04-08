import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getToken() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
