import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasharingService {
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  private ls = localStorage.getItem('user');

  lsData = JSON.parse(localStorage.getItem('user')!);

  isUserLoggedIn: boolean = this.ls ? true : false;

  sendBool(isUserLoggedIn: boolean, data: any) {
    this.subject.next((this.isUserLoggedIn = isUserLoggedIn));
    this.subject2.next((this.lsData = data));
  }

  getBool(): Observable<any> {
    return this.subject.asObservable();
  }

  getData(): Observable<any> {
    return this.subject2.asObservable();
  }

  constructor() {}
}
