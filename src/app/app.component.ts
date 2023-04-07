import { Component, OnInit } from '@angular/core';
import { DatasharingService } from './service/datasharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'clinic-ui';

  ls: any = null;

  constructor(private dataSharing: DatasharingService) {
    this.dataSharing.getData().subscribe((x) => (this.ls = x));
  }
  ngOnInit(): void {
    this.ls = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;
  }
}
