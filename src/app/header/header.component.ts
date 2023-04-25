import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Login,
  LoginTwoFactor,
  Update,
  UpdatePassword,
} from '../interface/login';
import { User } from '../interface/register';
import { DatasharingService } from '../service/datasharing.service';
import { LoginService } from '../service/login.service';
import { UpdatePasswordService } from '../service/update-password.service';
import { Router } from '@angular/router';

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

  loading: boolean = false;

  loginTwoFactorBool: boolean = false;

  forgotPasswrodBool: boolean = false;

  confirmationTokenBool: boolean = false;

  confirmationToken: string = '';

  twoFactorStr: string = '';
  updatePassword: string = '';
  updatePassword2: string = '';

  emailLogin: string = '';
  passwordLogin: string = '';

  constructor(
    private dataSharingService: DatasharingService,
    private loginService: LoginService,
    private updatePasswordService: UpdatePasswordService,
    private router: Router
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
    this.router.navigate(['/']);
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
    this.loading = true;
    this.loginService.loginUser(data).subscribe((x) => {
      if (x === false) {
        this.loading = false;

        this.errLoginMsg = 'მომხმარებელი ან პაროლი არასწორია';
        setTimeout(() => {
          this.errLoginMsg = '';
        }, 2000);
      } else if (x === true) {
        this.loading = false;
        this.loginTwoFactorBool = true;
      } else {
        this.loading = false;

        localStorage.setItem('user', JSON.stringify(x));
        this.ls = JSON.parse(localStorage.getItem('user')!);
        this.dataSharingService.sendBool(true, this.ls);
        this.loginOn = false;
        this.isUserLoggedIn = true;
      }
    });
  }

  onTwoFactorLogin() {
    this.loading = false;
    let data: LoginTwoFactor = {
      email: this.emailLogin,
      password: this.passwordLogin,
      twoFactorStr: this.twoFactorStr,
    };
    this.loginService.twoFactorLogin(data).subscribe((x) => {
      if (typeof x === 'string') {
        this.errLoginMsg = 'ბმულის მოქედების ვადა ამოიწურა"';
        setTimeout(() => {
          this.errLoginMsg = '';
        }, 2000);
      } else if (x) {
        this.twoFactorStr = '';
        localStorage.setItem('user', JSON.stringify(x));
        this.ls = JSON.parse(localStorage.getItem('user')!);
        this.dataSharingService.sendBool(true, this.ls);
        this.loginOn = false;
        this.isUserLoggedIn = true;
        this.loginTwoFactorBool = false;
      } else {
        this.errLoginMsg = 'კოდი არასწორია';
        setTimeout(() => {
          this.errLoginMsg = '';
        }, 2000);
      }
    });
  }

  sendConfrim() {
    this.loading = true;
    let data: Update = {
      email: this.emailLogin,
    };
    this.updatePasswordService.updateSend(data).subscribe((x) => {
      if (x) {
        this.loading = false;
        this.confirmationTokenBool = x;
        this.succLoginMsg = 'შეიყვანეთ აქტივაციის კოდი და ახალი პაროლი';
        setTimeout(() => {
          this.succLoginMsg = '';
        }, 2000);
      } else {
        this.loading = false;

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
            this.succLoginMsg = '';
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
