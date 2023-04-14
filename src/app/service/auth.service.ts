import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyProfile } from '../interface/doctors';
import { SendEmailChange, UpdateEmailChange } from '../interface/email-update';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private getMyProfileUrl = 'https://localhost:7162/api/User/getMyProfile';

  private passwordUpdateUrl = 'https://localhost:7162/api/User/passwordChange?';

  private emailChangeSendUrl =
    'https://localhost:7162/api/User/updateDoctorEmailSend';

  private emailUpdateUrl =
    'https://localhost:7162/api/User/updateDoctorEmailNew';

  constructor(private http: HttpClient) {}

  getToken() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  getMyProfile(): Observable<MyProfile> {
    return this.http.get<MyProfile>(this.getMyProfileUrl);
  }

  passwordUpdate(id: number, password: string): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.passwordUpdateUrl}Id=${id}&Password=${password}`,
      ''
    );
  }

  emailSend(data: SendEmailChange): Observable<boolean> {
    return this.http.put<boolean>(this.emailChangeSendUrl, data);
  }
  emailUpdate(data: UpdateEmailChange): Observable<boolean> {
    return this.http.put<boolean>(this.emailUpdateUrl, data);
  }
}
