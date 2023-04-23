import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interface/category';
import { Observable } from 'rxjs';
import {
  AdminCreateUser,
  AdminSendEmailChange,
  AdminUpdateEmailChange,
  IDoctorAppointment,
  IDoctorAppointmentAdd,
  UserDelete,
} from '../interface/admin-create-user';
import { Doctors } from '../interface/doctors';
import { Appointment } from '../interface/appointment';

@Injectable({
  providedIn: 'root',
})
export class AdminControllerService {
  private getCategoryUrl = 'https://localhost:7162/api/Admin/getCategorys';

  private createUserUrl = 'https://localhost:7162/api/Admin/addUser';

  private passwordChangeUrl = 'https://localhost:7162/api/Admin/updateUser?';

  private sendCodeEmailUrl =
    'https://localhost:7162/api/Admin/updateDoctorEmailSend';

  private updateEmailUrl =
    'https://localhost:7162/api/Admin/updateDoctorEmailNew';

  private getAllUserUrl = 'https://localhost:7162/api/Admin/GetAllUsers';

  private deleteUserUrl = 'https://localhost:7162/api/Admin/deleteUser?Id=';

  private isPinnedUrl = 'https://localhost:7162/api/Admin/changePin';

  private doctorAppointmentsUrl =
    'https://localhost:7162/api/Admin/doctorAppointments?Id=';

  private addDoctorAppointmentsUrl =
    'https://localhost:7162/api/Admin/doctorAppointments';
  private delDoctorAppointmentsUrl =
    'https://localhost:7162/api/Admin/doctorAppointmentDelete?AppointmentId=';
  constructor(private http: HttpClient) {}

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getCategoryUrl);
  }

  createUser(data: FormData): Observable<Doctors> {
    return this.http.post<Doctors>(this.createUserUrl, data);
  }

  passwordChange(id: number, password: string): Observable<any> {
    return this.http.put(
      `${this.passwordChangeUrl}Id=${id}&Password=${password}`,
      ''
    );
  }
  sendCodeEmail(data: AdminSendEmailChange): Observable<boolean> {
    return this.http.put<boolean>(this.sendCodeEmailUrl, data);
  }

  updateEmail(data: AdminUpdateEmailChange): Observable<boolean | string> {
    return this.http.put<boolean | string>(this.updateEmailUrl, data);
  }

  getAllUser(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>(this.getAllUserUrl);
  }

  deleteUser(data: UserDelete): Observable<boolean> {
    return this.http.delete<boolean>(`${this.deleteUserUrl}${data.id}`);
  }

  changePin(data: { id: number }): Observable<any> {
    return this.http.put(this.isPinnedUrl, data);
  }

  doctorAppointments(data: IDoctorAppointment): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.doctorAppointmentsUrl}${data.id}`
    );
  }

  addDoctorAppointments(
    data: IDoctorAppointmentAdd
  ): Observable<Appointment[]> {
    return this.http.post<Appointment[]>(this.addDoctorAppointmentsUrl, data);
  }

  delDoctorAppointments(data: { appointmentId: number }): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.delDoctorAppointmentsUrl}${data.appointmentId}`
    );
  }
}
