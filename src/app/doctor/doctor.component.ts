import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryNumbers } from '../interface/category';
import { DoctorProfile, Doctors } from '../interface/doctors';
import { UserService } from '../service/user.service';
import { Appointment } from '../interface/appointment';
import { IUserAppointment } from '../interface/admin-create-user';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  categoryNames: CategoryNumbers[] = [];

  doctorsBool: boolean = true;

  logReg: boolean = false;

  description: string = '';

  appointments: Appointment[] = [];

  doctors: Doctors[] = [];
  doctors2: Doctors[] = [];

  selectedId: number = 0;

  doctor!: Doctors;

  selected: any;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategoryNumbers().subscribe((x) => {
      this.categoryNames = x;
    });

    this.categoryService.getDoctors().subscribe((x) => {
      this.doctors = x;
      this.doctors2 = x;
    });
  }

  onSelect(select: any) {
    this.selectedId = 0;
    this.doctorsBool = true;
    if (this.selected === select) {
      this.selected = '';
      this.doctors = this.doctors2;
    } else {
      this.selected = select;
      this.doctors = this.doctors2.filter((x) => x.categoryName === select);
    }
  }

  onClick(data: Doctors) {
    this.doctorsBool = false;
    const sendData: DoctorProfile = {
      id: data.id,
    };
    this.userService.getDoctorProfileForAppointment(sendData).subscribe((x) => {
      this.doctor = x;
      console.log(x);
    });
    this.userService.getDocotrAppointments(data).subscribe((x) => {
      this.appointments = x;
    });
  }

  onSel(data: Appointment) {
    if (this.selectedId === data.id) {
      this.selectedId = 0;
    } else {
      this.selectedId = data.id;
    }
  }

  onAppointment() {
    const sendData: IUserAppointment = {
      id: this.selectedId,
    };
    if (localStorage.getItem('user')) {
      this.userService.reservation(sendData).subscribe((x) => {
        if (x) {
          this.appointments = x;
          this.selectedId = 0;
        }
      });
    } else {
      this.logReg = true;

      setTimeout(() => {
        this.logReg = false;
      }, 5000);
    }
  }
}
