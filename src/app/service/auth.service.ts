import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyProfile } from '../interface/doctors';
import { SendEmailChange, UpdateEmailChange } from '../interface/email-update';
import {
  Appointment,
  AppointmentDel,
  AppointmentSend,
} from '../interface/appointment';
import { IUserAppointment } from '../interface/admin-create-user';
import { DoctorDetail, TwoFactorI, UserDetail } from '../interface/user';

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

  private appointmentUrl = 'https://localhost:7162/api/Appointment';

  private addAppointmentUrl =
    'https://localhost:7162/api/Appointment/addAppointment';

  private delAppointmentUrl =
    'https://localhost:7162/api/Appointment/deleteAppointment?Id=';

  private userAppointmentUrl =
    'https://localhost:7162/api/Appointment/userAppointment';

  private userAppointmentDelUrl =
    'https://localhost:7162/api/Appointment/userAppointmentRemove';

  private getMoreDetailUrl =
    'https://localhost:7162/api/User/getMoreDetail?Id=';

  private getMoreUrl = 'https://localhost:7162/api/User/getMore?Id=';

  private twoFactorUrl = 'https://localhost:7162/api/User/changeTwoFactor';

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

  appointmentGet(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentUrl);
  }

  addAppointment(data: AppointmentSend): Observable<any> {
    return this.http.post(this.addAppointmentUrl, data);
  }

  delAppointment(data: AppointmentDel): Observable<boolean> {
    return this.http.delete<boolean>(`${this.delAppointmentUrl}${data.id}`);
  }

  getUserAppointment(): Observable<any> {
    return this.http.get(this.userAppointmentUrl);
  }

  delUserAppointment(data: AppointmentDel): Observable<boolean> {
    return this.http.put<boolean>(this.userAppointmentDelUrl, data);
  }

  getMoreDetail(data: IUserAppointment): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.getMoreDetailUrl}${data.id}`);
  }

  getMore(data: IUserAppointment): Observable<DoctorDetail> {
    return this.http.get<DoctorDetail>(`${this.getMoreUrl}${data.id}`);
  }

  twoFactor(data: TwoFactorI): Observable<boolean> {
    return this.http.put<boolean>(this.twoFactorUrl, data);
  }
}
