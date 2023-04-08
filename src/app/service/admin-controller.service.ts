import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interface/category';
import { Observable } from 'rxjs';
import { AdminCreateUser } from '../interface/admin-create-user';

@Injectable({
  providedIn: 'root',
})
export class AdminControllerService {
  private getCategoryUrl = 'https://localhost:7162/api/Admin/getCategorys';

  private createUserUrl = 'https://localhost:7162/api/Admin/addUser';

  constructor(private http: HttpClient) {}

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getCategoryUrl);
  }

  createUser(data: AdminCreateUser): Observable<any> {
    return this.http.post(this.createUserUrl, data);
  }
}
