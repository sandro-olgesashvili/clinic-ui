import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MyProfile } from '../interface/doctors';
import { MessageService } from 'primeng/api';
import { SendEmailChange, UpdateEmailChange } from '../interface/email-update';
import { Router } from '@angular/router';
import { DatasharingService } from '../service/datasharing.service';

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

  passwordBool: boolean = false;

  password: string = '';

  role: string = '';

  emailBool: boolean = false;

  sendCode: boolean = true;

  email: string = '';

  confirmationToken: string = '';

  confirmationTokenEmail: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private dataSharingService: DatasharingService
  ) {}

  ngOnInit(): void {
    this.authService.getMyProfile().subscribe((x) => {
      this.myProfile = x;
      console.log(x);
      x.role === 'doctor' ? (this.role = 'ექიმი') : '';
    });
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
    if (this.email.trim()) {
      this.authService.emailSend(data).subscribe((x) => {
        if (x) {
          this.sendCode = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Email',
            detail: 'მიუთითეთ კოდი',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'მიუთითეთ სხვა Email',
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

  onEmailChange() {
    const data: UpdateEmailChange = {
      id: this.myProfile.id,
      email: this.email,
      confirmationToken: this.confirmationToken,
      confirmationTokenEmail: this.confirmationTokenEmail,
    };
    if (this.confirmationToken.trim() || this.confirmationTokenEmail.trim()) {
      this.authService.emailUpdate(data).subscribe((x) => {
        if (x) {
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
          this.messageService.add({
            severity: 'error',
            summary: 'Email',
            detail: 'კოდი არასწორია',
            life: 3000,
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Email',
        detail: 'შეავსეთ ყველა ველი',
        life: 3000,
      });
    }
  }
}
