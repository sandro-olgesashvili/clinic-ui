import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { DoctorProfile, Doctors } from '../interface/doctors';
import { AdminControllerService } from '../service/admin-controller.service';
import { MessageService } from 'primeng/api';
import {
  AdminSendEmailChange,
  AdminUpdateEmailChange,
  UserDelete,
} from '../interface/admin-create-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Doctors = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    idNumber: '',
    categoryName: '',
    role: '',
  };

  role?: string;

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
    private router: Router
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
      });
    });
  }

  onPassword() {
    this.passwordBool = !this.passwordBool;
  }
  onCancel() {
    this.passwordBool = false;
    this.emailBool = false;
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

  onEmailChange() {
    const data: AdminSendEmailChange = {
      id: this.profile.id,
      email: this.email,
      name: this.profile.name,
    };
    if (this.email.trim()) {
      this.adminControllerService.sendCodeEmail(data).subscribe((x) => {
        if (x) {
          this.sendCode = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Email',
            detail: 'Email შეცვლილია',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'სცადეთ სხვა Email',
            life: 3000,
          });
        }
      });
    } else {
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

    if (this.confirmationToken.trim() || this.confirmationTokenEmail.trim()) {
      this.adminControllerService.updateEmail(data).subscribe((x) => {
        if (x) {
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
          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'სცადეთ სხვა Email',
            life: 3000,
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Email',
        detail: 'შეავსეთ Email-ის ველი',
        life: 3000,
      });
    }
  }

  onPasswordChange() {
    if (this.password.trim()) {
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
}
