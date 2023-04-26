import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestorePassword, Update, UpdatePassword } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService {
  private updateUrl = 'https://localhost:7162/api/User/update-confirm-send';

  private updatePasswordUrl = 'https://localhost:7162/api/User/update';

  private passwordRestoreUrl =
    'https://localhost:7162/api/User/passwrodRestore';

  constructor(private http: HttpClient) {}

  updateSend(data: Update): Observable<any> {
    return this.http.put(this.updateUrl, data);
  }

  confirmPassword(data: UpdatePassword): Observable<any> {
    return this.http.put(this.updatePasswordUrl, data);
  }

  restorePassword(data: RestorePassword): Observable<boolean> {
    return this.http.put<boolean>(this.passwordRestoreUrl, data);
  }
}
