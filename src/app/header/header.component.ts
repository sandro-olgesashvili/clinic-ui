import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Login, Update, UpdatePassword } from '../interface/login';
import { User } from '../interface/register';
import { DatasharingService } from '../service/datasharing.service';
import { LoginService } from '../service/login.service';
import { UpdatePasswordService } from '../service/update-password.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  ls: User | null = JSON.parse(localStorage.getItem('user')!);
  isUserLoggedIn: boolean = false;

  subscription!: Subscription;
  subscription2!: Subscription;

  errLoginMsg = '';
  succLoginMsg = '';

  loginOn: boolean = false;

  forgotPasswrodBool: boolean = false;

  confirmationTokenBool: boolean = false;

  confirmationToken: string = '';

  updatePassword: string = '';
  updatePassword2: string = '';

  emailLogin: string = '';
  passwordLogin: string = '';

  constructor(
    private dataSharingService: DatasharingService,
    private loginService: LoginService,
    private updatePasswordService: UpdatePasswordService
  ) {
    this.subscription = this.dataSharingService.getBool().subscribe((x) => {
      this.isUserLoggedIn = x;
    });

    this.subscription2 = this.dataSharingService.getData().subscribe((x) => {
      this.ls = x;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.ls ? true : false;
  }

  logout() {
    this.dataSharingService.sendBool(false, null);
    localStorage.removeItem('user');
  }

  closeLogin() {
    this.loginOn = false;
    this.passwordLogin = '';
  }
  openLogin() {
    this.loginOn = true;
    this.passwordLogin = '';
    this.emailLogin = '';
  }

  forgotPassword() {
    this.forgotPasswrodBool = !this.forgotPasswrodBool;
  }

  login() {
    let data: Login = {
      email: this.emailLogin,
      password: this.passwordLogin,
    };
    this.loginService.loginUser(data).subscribe((x) => {
      if (x === false) {
        this.errLoginMsg = 'მომხმარებელი ან პაროლი არასწორია';
        setTimeout(() => {
          this.errLoginMsg = '';
        }, 2000);
      } else {
        localStorage.setItem('user', JSON.stringify(x));
        this.ls = JSON.parse(localStorage.getItem('user')!);
        this.loginOn = false;
        this.isUserLoggedIn = true;
      }
    });
  }

  sendConfrim() {
    let data: Update = {
      email: this.emailLogin,
    };
    this.updatePasswordService.updateSend(data).subscribe((x) => {
      if (x) {
        this.confirmationTokenBool = x;
        this.succLoginMsg = 'შეიყვანეთ აქტივაციის კოდი და ახალი პაროლი';
        setTimeout(() => {
          this.succLoginMsg = '';
        }, 2000);
      } else {
        this.errLoginMsg = 'მომხმარებელი არასწორია';
        setTimeout(() => {
          this.errLoginMsg = '';
        }, 2000);
      }
    });
  }
  update() {
    let data: UpdatePassword = {
      email: this.emailLogin,
      password: this.updatePassword,
      confirmationToken: this.confirmationToken,
    };
    if (this.updatePassword !== this.updatePassword2) {
      this.errLoginMsg = 'პაროლი არასწორია';
      setTimeout(() => {
        this.errLoginMsg = '';
      }, 2000);
    } else {
      this.updatePasswordService.confirmPassword(data).subscribe((x) => {
        if (x) {
          this.updatePassword = '';
          this.updatePassword2 = '';
          this.confirmationToken = '';
          this.forgotPasswrodBool = false;
          this.confirmationTokenBool = false;
          this.succLoginMsg = 'პაროლი აღდგენილია';
          setTimeout(() => {
            this.errLoginMsg = '';
          }, 2000);
        } else {
          this.errLoginMsg = 'მომხმარებელი ან აქტივაციის კოდი არასწორია';
          setTimeout(() => {
            this.errLoginMsg = '';
          }, 2000);
        }
      });
    }
  }
}