import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserAppointment } from '../interface/admin-create-user';
import { Appointment } from '../interface/appointment';

@Injectable({
  providedIn: 'root',
})
export class AdminControllerUserService {
  private getUserAppointmentUrl =
    'https://localhost:7162/api/Admin/userAppointment?Id=';

  private delUserAppointmentUrl =
    'https://localhost:7162/api/Admin/userAppointmentDel?Id=';

  constructor(private http: HttpClient) {}

  getUserAppointment(data: IUserAppointment): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.getUserAppointmentUrl}${data.id}`
    );
  }
  delUserAppointment(data: IUserAppointment): Observable<boolean> {
    return this.http.delete<boolean>(`${this.delUserAppointmentUrl}${data.id}`);
  }
}
