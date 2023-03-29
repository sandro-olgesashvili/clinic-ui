import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl: string = 'https://localhost:7162/api/User/login';

  constructor(private http: HttpClient) {}

  loginUser(data: Login): Observable<any> {
    return this.http.post(this.loginUrl, data);
  }
}
