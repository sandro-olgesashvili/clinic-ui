import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private getCategoryUrl = 'https://localhost:7162/api/Admin/getCategorys';

  private createCategoryUrl = 'https://localhost:7162/api/Admin/createCategory';

  private removeCategoryUrl =
    'https://localhost:7162/api/Admin/removeCategory?CategoryName=';

  private updateCategoryUrl = 'https://localhost:7162/api/Admin/updateCategory';

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
}
