import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interface/category';
import { Observable } from 'rxjs';
import {
  AdminCreateUser,
  AdminSendEmailChange,
  AdminUpdateEmailChange,
  UserDelete,
} from '../interface/admin-create-user';

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
  constructor(private http: HttpClient) {}

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getCategoryUrl);
  }

  createUser(data: AdminCreateUser): Observable<any> {
    return this.http.post(this.createUserUrl, data);
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

  getAllUser(): Observable<any> {
    return this.http.get(this.getAllUserUrl);
  }

  deleteUser(data: UserDelete): Observable<boolean> {
    return this.http.delete<boolean>(`${this.deleteUserUrl}${data.id}`);
  }
}
