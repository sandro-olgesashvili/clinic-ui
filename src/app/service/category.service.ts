import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryNumbers } from '../interface/category';
import { Doctors } from '../interface/doctors';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private getCategoryUrl = 'https://localhost:7162/api/Admin/getCategorys';

  private createCategoryUrl = 'https://localhost:7162/api/Admin/createCategory';

  private removeCategoryUrl =
    'https://localhost:7162/api/Admin/removeCategory?CategoryName=';

  private updateCategoryUrl = 'https://localhost:7162/api/Admin/updateCategory';

  private getCategoryNumbersUrl =
    'https://localhost:7162/api/User/doctorCategory';

  private getDoctorsUrl = 'https://localhost:7162/api/User/doctor';

  constructor(private http: HttpClient) {}

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getCategoryUrl);
  }

  createCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(this.createCategoryUrl, data);
  }

  removeCategory(data: Category): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.removeCategoryUrl}${data.categoryName}`
    );
  }

  updateCategory(data: Category): Observable<any> {
    return this.http.put(this.updateCategoryUrl, data);
  }

  getCategoryNumbers(): Observable<CategoryNumbers[]> {
    return this.http.get<CategoryNumbers[]>(this.getCategoryNumbersUrl);
  }

  getDoctors(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>(this.getDoctorsUrl);
  }
}
