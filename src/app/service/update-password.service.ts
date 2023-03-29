import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Update, UpdatePassword } from '../interface/login';

@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService {
  updateUrl = 'https://localhost:7162/api/User/update-confirm-send';

  updatePasswordUrl = 'https://localhost:7162/api/User/update';

  constructor(private http: HttpClient) {}

  updateSend(data: Update): Observable<any> {
    return this.http.put(this.updateUrl, data);
  }

  confirmPassword(data: UpdatePassword): Observable<any> {
    return this.http.put(this.updatePasswordUrl, data);
  }
}
