import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MyProfile } from '../interface/doctors';
import { MessageService } from 'primeng/api';
import { SendEmailChange, UpdateEmailChange } from '../interface/email-update';
import { Router } from '@angular/router';
import { DatasharingService } from '../service/datasharing.service';
import {
  Appointment,
  AppointmentDel,
  AppointmentSend,
} from '../interface/appointment';
import { IUserAppointment } from '../interface/admin-create-user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  myProfile: MyProfile = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    idNumber: '',
    categoryName: null,
    role: '',
  };

  details: { name: string; surname: string; des: string; image: string } = {
    image: '',
    name: '',
    surname: '',
    des: '',
  };

  loading: boolean = false;

  detailsBool: boolean = false;

  startDate!: Date | undefined;
  endDate!: Date | undefined;

  appointmentArr: Appointment[] = [];

  userAppointment: Appointment[] = [];
  reserved: Appointment[] = [];

  passwordBool: boolean = false;

  password: string = '';

  role: string = '';

  emailBool: boolean = false;

  sendCode: boolean = true;

  email: string = '';

  confirmationToken: string = '';

  confirmationTokenEmail: string = '';

  ls: any;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private dataSharingService: DatasharingService
  ) {}

  ngOnInit(): void {
    this.ls = JSON.parse(localStorage.getItem('user')!);

    this.authService.getMyProfile().subscribe((x) => {
      this.myProfile = x;
      x.role === 'doctor' ? (this.role = 'ექიმი') : '';
    });
    if (this.ls.role === 'doctor') {
      this.authService.appointmentGet().subscribe((x) => {
        this.appointmentArr = x;
        this.reserved = x.filter((x) => x.patientId !== null);
      });
    } else {
      this.authService.getUserAppointment().subscribe((data) => {
        this.userAppointment = data;
      });
    }
  }

  onUpdatePasswrod() {
    if (this.password.trim()) {
      this.authService
        .passwordUpdate(this.myProfile.id, this.password)
        .subscribe((x) => {
          if (x) {
            this.messageService.add({
              severity: 'success',
              summary: 'პაროლი',
              detail: 'პაროლი შეცვლილია',
              life: 3000,
            });
            this.passwordBool = false;
            this.password = '';
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'პაროლი',
        detail: 'შეავსეთ პაროლის ველი',
        life: 3000,
      });
    }
  }

  cancelOpen() {
    this.passwordBool = !this.passwordBool;
  }

  emailCloseOpne() {
    this.emailBool = !this.emailBool;
  }

  onEmailSend() {
    const data: SendEmailChange = {
      id: this.myProfile.id,
      email: this.email,
      name: this.myProfile.name,
    };
    this.loading = true;
    if (this.email.trim()) {
      this.authService.emailSend(data).subscribe((x) => {
        if (x) {
          this.loading = false;
          this.sendCode = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Email',
            detail: 'მიუთითეთ კოდი',
            life: 3000,
          });
        } else {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'მიუთითეთ სხვა Email',
            life: 3000,
          });
        }
      });
    } else {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Email',
        detail: 'შეავსეთ Email-ის ველი',
        life: 3000,
      });
    }
  }

  onEmailChange() {
    const data: UpdateEmailChange = {
      id: this.myProfile.id,
      email: this.email,
      confirmationToken: this.confirmationToken,
      confirmationTokenEmail: this.confirmationTokenEmail,
    };
    this.loading = true;
    if (this.confirmationToken.trim() || this.confirmationTokenEmail.trim()) {
      this.authService.emailUpdate(data).subscribe((x) => {
        if (x) {
          this.loading = false;
          this.sendCode = true;
          this.emailBool = false;
          this.myProfile.email = this.email;
          this.messageService.add({
            severity: 'success',
            summary: 'Email',
            detail: 'Email შეცვლილია',
            life: 3000,
          });
          this.email = '';
          this.router.navigate(['/']);
          localStorage.removeItem('user');
          this.dataSharingService.sendBool(false, null);
        } else {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'კოდი არასწორია',
            life: 3000,
          });
        }
      });
    } else {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Email',
        detail: 'შეავსეთ ყველა ველი',
        life: 3000,
      });
    }
  }

  onDatePick() {
    if (this.startDate && this.endDate) {
      const data: AppointmentSend = {
        startTime: new Date(
          this.startDate.getTime() - this.startDate.getTimezoneOffset() * 60000
        ).toJSON(),
        endTime: new Date(
          this.endDate.getTime() - this.endDate.getTimezoneOffset() * 60000
        ).toJSON(),
        patientId: null,
      };
      this.authService.addAppointment(data).subscribe((x) => {
        this.appointmentArr = x;
        this.startDate = undefined;
        this.endDate = undefined;
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'შეავსეთ ყველა ველი',
        life: 3000,
      });
    }
  }

  onDelete(dataId: number) {
    const data: AppointmentDel = {
      id: dataId,
    };
    this.authService.delAppointment(data).subscribe((x) => {
      this.appointmentArr = this.appointmentArr.filter((x) => x.id !== data.id);
    });
  }
  onDeleteUserApp(dataId: number) {
    const data: AppointmentDel = {
      id: dataId,
    };
    this.authService.delUserAppointment(data).subscribe((x) => {
      this.userAppointment = this.userAppointment.filter(
        (x) => x.id !== data.id
      );
    });
  }

  onClick(data: Appointment) {
    const sendData: IUserAppointment = {
      id: data.id,
    };
    this.authService.getMoreDetail(sendData).subscribe((x) => {
      this.detailsBool = true;
      this.details.image = x.image;
      this.details.surname = x.surname;
      this.details.name = x.name;
    });
  }

  onClose() {
    this.detailsBool = false;
  }
  onClickMore(data: Appointment) {
    const sendData: IUserAppointment = {
      id: data.id,
    };
    this.authService.getMore(sendData).subscribe((x) => {
      this.detailsBool = true;
      this.details.image = x.image;
      this.details.surname = x.surname;
      this.details.name = x.name;
    });
  }
}
