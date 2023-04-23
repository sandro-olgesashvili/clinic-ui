import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorProfile, Doctors } from '../interface/doctors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private getDoctorProfileUrl =
    'https://localhost:7162/api/User/getDoctorProfile?Id=';

  constructor(private http: HttpClient) {}

  getDoctorProfile(data: DoctorProfile): Observable<Doctors> {
    return this.http.get<Doctors>(`${this.getDoctorProfileUrl}${data.id}`);
  }
}
