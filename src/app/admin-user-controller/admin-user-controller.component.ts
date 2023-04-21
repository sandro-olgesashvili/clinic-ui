import { Component, OnInit } from '@angular/core';
import { Doctors } from '../interface/doctors';
import { AdminControllerService } from '../service/admin-controller.service';

@Component({
  selector: 'app-admin-user-controller',
  templateUrl: './admin-user-controller.component.html',
  styleUrls: ['./admin-user-controller.component.css'],
})
export class AdminUserControllerComponent implements OnInit {
  doctors: Doctors[] = [];
  doctors2: Doctors[] = [];

  users: Doctors[] = [];

  admin: Doctors[] = [];

  selected: any;

  constructor(private adminControllerService: AdminControllerService) {}

  ngOnInit(): void {
    this.adminControllerService.getAllUser().subscribe((x) => {
      this.doctors = x.filter((doc) => doc.role === 'doctor');
      this.doctors2 = x;
      this.users = x.filter((user) => user.role === 'user');
      this.admin = x.filter((admin) => admin.role === 'admin');
    });
  }

  onSelect(select: any) {
    if (this.selected === select) {
      this.selected = '';
      this.doctors = this.doctors2;
    } else {
      this.selected = select;
      this.doctors = this.doctors2.filter((x) => x.categoryName === select);
    }
  }

  onChangePin(data: Doctors) {
    const sendData = { id: data.id };
    let doctor: Doctors[] = this.doctors.filter((x) => x.id === data.id);

    this.adminControllerService.changePin(sendData).subscribe((x) => {
      doctor[0].isPinned = x.isPinned;
      console.log(x);
    });
  }
}
