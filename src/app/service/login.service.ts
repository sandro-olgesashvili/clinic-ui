import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginTwoFactor } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl: string = 'https://localhost:7162/api/User/login';

  private twoFactorLoginUrl = 'https://localhost:7162/api/User/twoFactorLogin';

  constructor(private http: HttpClient) {}

  loginUser(data: Login): Observable<any> {
    return this.http.post(this.loginUrl, data);
  }

  twoFactorLogin(data: LoginTwoFactor): Observable<any> {
    return this.http.post(this.twoFactorLoginUrl, data);
  }
}
