import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmationToken, Register } from '../interface/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl = 'https://localhost:7162/api/User/register';
  private confirmUrl = 'https://localhost:7162/api/User/confirm';

  constructor(private http: HttpClient) {}

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  register(data: Register): Observable<any> {
    return this.http.post(this.registerUrl, data);
  }

  confirmRegister(data: ConfirmationToken): Observable<any> {
    return this.http.post(this.confirmUrl, data, { headers: this.httpHeader });
  }
}
