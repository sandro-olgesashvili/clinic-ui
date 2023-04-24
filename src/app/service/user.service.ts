import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctors } from '../interface/doctors';
import { IUserAppointment } from '../interface/admin-create-user';
import { Appointment } from '../interface/appointment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getDoctorProfileForAppointmentUrl =
    'https://localhost:7162/api/User/getDoctorProfileForAppointment?Id=';

  private getDocotrAppointmentsUrl =
    'https://localhost:7162/api/User/getDocotrAppointments?Id=';

  private reservationUrl = 'https://localhost:7162/api/User/reservation';

  private viewsUrl = 'https://localhost:7162/api/User/views';

  constructor(private http: HttpClient) {}

  getDoctorProfileForAppointment(data: IUserAppointment): Observable<Doctors> {
    return this.http.get<Doctors>(
      `${this.getDoctorProfileForAppointmentUrl}${data.id}`
    );
  }

  getDocotrAppointments(data: IUserAppointment): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.getDocotrAppointmentsUrl}${data.id}`
    );
  }

  reservation(data: IUserAppointment): Observable<Appointment[]> {
    return this.http.post<Appointment[]>(this.reservationUrl, data);
  }

  views(data: IUserAppointment): Observable<boolean> {
    return this.http.post<boolean>(this.viewsUrl, data);
  }
}
