import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { DoctorProfile, Doctors } from '../interface/doctors';
import { AdminControllerService } from '../service/admin-controller.service';
import { MessageService } from 'primeng/api';
import {
  AdminSendEmailChange,
  AdminUpdateEmailChange,
  IUserAppointment,
  UserDelete,
} from '../interface/admin-create-user';
import { Appointment, AppointmentSend } from '../interface/appointment';
import { AdminControllerUserService } from '../service/admin-controller-user.service';
import { AuthService } from '../service/auth.service';
import { UserDetail } from '../interface/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  passwordReg =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  profile: Doctors = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    idNumber: '',
    categoryName: '',
    role: '',
    imageSrc: '',
    pdfSrc: '',
  };

  details: UserDetail = {
    image: '',
    name: '',
    surname: '',
    description: '',
  };

  loading: boolean = false;

  detailsBool: boolean = false;

  role?: string;

  startDate?: Date;

  endDate?: Date;

  appointmentArr: Appointment[] = [];

  resApp: Appointment[] = [];

  userAppointment: Appointment[] = [];

  passwordBool: boolean = false;

  emailBool: boolean = false;

  sendCode: boolean = true;

  ls = JSON.parse(localStorage.getItem('user')!);

  password: string = '';

  email: string = '';

  confirmationToken: string = '';

  confirmationTokenEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private adminControllerService: AdminControllerService,
    private messageService: MessageService,
    private router: Router,
    private adminControllerUserService: AdminControllerUserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const data: DoctorProfile = { id: Number(paramMap.get('id')) };

      this.doctorService.getDoctorProfile(data).subscribe((x) => {
        this.profile = x;
        x.role === 'admin'
          ? (this.role = 'ადმინისტრატორი')
          : x.role === 'user'
          ? (this.role = 'მომხმარებელი')
          : (this.role = 'ექიმი');
        this.adminControllerService
          .doctorAppointments(data)
          .subscribe((app) => {
            if (app && this.role === 'ექიმი') {
              this.appointmentArr = app;
              this.resApp = app.filter((x) => x.patientId !== null);
            }
          });
        this.adminControllerUserService
          .getUserAppointment(data)
          .subscribe((user) => {
            if (user && this.role === 'მომხმარებელი') {
              this.userAppointment = user;
            }
          });
      });
    });
  }

  onPassword() {
    this.passwordBool = !this.passwordBool;
  }
  onCancel() {
    this.passwordBool = false;
    this.emailBool = false;
    this.password = '';
    this.email = '';
  }
  onEmail() {
    this.emailBool = true;
  }

  onDelete() {
    const data: UserDelete = {
      id: this.profile.id,
    };
    this.adminControllerService.deleteUser(data).subscribe((x) => {
      if (x) {
        this.router.navigate(['/admin']);
      }
    });
  }

  onDeleteUser(id: number) {
    const data: UserDelete = {
      id: id,
    };
    this.adminControllerUserService.delUserAppointment(data).subscribe((x) => {
      if (x) {
        this.userAppointment = this.userAppointment.filter(
          (item) => item.id !== data.id
        );
      }
    });
  }

  onEmailChange() {
    const data: AdminSendEmailChange = {
      id: this.profile.id,
      email: this.email,
      name: this.profile.name,
    };
    this.loading = true;
    if (this.email.trim()) {
      this.adminControllerService.sendCodeEmail(data).subscribe((x) => {
        if (x) {
          this.loading = false;
          this.sendCode = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Email',
            detail: 'Email შეცვლილია',
            life: 3000,
          });
        } else {
          this.loading = false;

          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'სცადეთ სხვა Email',
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

  onUpdateEmail() {
    const data: AdminUpdateEmailChange = {
      id: this.profile.id,
      email: this.email,
      confirmationToken: this.confirmationToken,
      confirmationTokenEmail: this.confirmationTokenEmail,
    };
    this.loading = true;
    if (this.confirmationToken.trim() || this.confirmationTokenEmail.trim()) {
      this.adminControllerService.updateEmail(data).subscribe((x) => {
        if (x) {
          this.loading = false;

          this.sendCode = true;
          this.emailBool = false;
          this.profile.email = this.email;
          this.messageService.add({
            severity: 'success',
            summary: 'Email',
            detail: 'Email შეცვლილია',
            life: 3000,
          });
        } else {
          this.loading = false;

          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'სცადეთ სხვა Email',
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

  onPasswordChange() {
    if (!this.passwordReg.test(this.password)) {
      this.messageService.add({
        severity: 'error',
        summary: 'პაროლი',
        detail: 'სცადეთ სხვა პაროლი',
        life: 3000,
      });
    } else if (this.password.trim()) {
      this.adminControllerService
        .passwordChange(this.profile.id, this.password)
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

  onDatePick() {
    if (this.startDate && this.endDate) {
      const data: AppointmentSend = {
        id: this.profile.id,
        startTime: new Date(
          this.startDate.getTime() - this.startDate.getTimezoneOffset() * 60000
        ).toJSON(),
        endTime: new Date(
          this.endDate.getTime() - this.endDate.getTimezoneOffset() * 60000
        ).toJSON(),
        patientId: null,
      };
      this.adminControllerService.addDoctorAppointments(data).subscribe((x) => {
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

  onDelDoctorAppointments(id: number) {
    const data = {
      appointmentId: id,
    };
    this.adminControllerService.delDoctorAppointments(data).subscribe((x) => {
      if (x) {
        this.appointmentArr = this.appointmentArr.filter((x) => x.id !== id);
      }
    });
  }
  onClose() {
    this.detailsBool = false;
  }

  onClick(data: Appointment) {
    const sendData: IUserAppointment = {
      id: data.id,
    };
    this.authService.getMoreDetail(sendData).subscribe((x) => {
      this.detailsBool = true;

      this.details = x;
    });
  }

  onUserClick(data: Appointment) {
    const sendData: IUserAppointment = {
      id: data.id,
    };
    this.authService.getMore(sendData).subscribe((x) => {
      this.detailsBool = true;
      this.details.image = x.image;
      this.details.surname = x.surname;
      this.details.name = x.name;
      this.details.description = x.description;
    });
  }
}
