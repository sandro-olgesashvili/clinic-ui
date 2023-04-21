import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationToken, Register } from '../interface/register';
import { DatasharingService } from '../service/datasharing.service';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  nameReg = /^[a-zA-Z]{5,}$/;
  idNumberReg = /^[a-zA-Z0-9]{11}$/;
  passwordReg =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  isUserLoggedIn!: boolean;

  errMsg: string = '';
  succMSg: string = '';
  errConfirm: string = '';

  name: string = '';
  email: string = '';
  idNumber: string = '';
  surname: string = '';
  password: string = '';
  confirmationToken: string = '';
  imageName: string = '';

  formData: FormData = new FormData();
  file!: File | null;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private dataSharingService: DatasharingService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  onChange($event: any) {
    if ($event.target.files) {
      this.file = null;
      this.file = $event.target.files[0];
      this.imageName = $event.target.files[0].name;
      this.formData.append('ImageFile', $event.target.files[0]);
      console.log(this.file);
      console.log(this.imageName);
    }
  }

  sendEmial() {
    if (!this.nameReg.test(this.name)) {
      if (this.name.trim().length < 1) {
        this.errMsg = 'მიუთითეთ სახელი';

        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      } else {
        this.errMsg = 'სახელი არასწორია';

        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      }
    } else if (!this.emailReg.test(this.email)) {
      if (this.email.trim().length < 1) {
        this.errMsg = 'მიუთითეთ მეილი';

        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      } else {
        this.errMsg = 'მეილი არასწორია';

        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      }
    } else if (!this.idNumberReg.test(this.idNumber)) {
      if (this.idNumber.trim().length < 1) {
        this.errMsg = 'მიუთითეთ პირადი ნომერი';
        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      } else {
        this.errMsg = 'მიუთითეთ სწორი პირადი ნომერი';
        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      }
    } else if (!this.passwordReg.test(this.password)) {
      this.errMsg = 'სცადეთ სხვა პაროლი';

      setTimeout(() => {
        this.errMsg = '';
      }, 2000);
    } else if (!this.nameReg.test(this.surname)) {
      this.errMsg = 'მიუთითეთ გვარი';

      setTimeout(() => {
        this.errMsg = '';
      }, 2000);
    } else if (!this.file) {
      this.errMsg = 'ატვირთეთ სურათი';

      setTimeout(() => {
        this.errMsg = '';
      }, 2000);
    } else {
      this.formData.append('name', this.name);
      this.formData.append('email', this.email);
      this.formData.append('idNumber', this.idNumber);
      this.formData.append('surname', this.surname);
      this.formData.append('password', this.password);
      this.formData.append('imageName', this.imageName);

      this.registerService.register(this.formData).subscribe((x) => {
        if (x) {
          this.succMSg = 'შეიყვანეთ აქტივაციის კოდი';
          setTimeout(() => {
            this.succMSg = '';
          }, 2000);
        } else {
          this.errMsg = 'არსებული მეილით მომხმარებელი უკვე არსებობს';

          setTimeout(() => {
            this.errMsg = '';
          }, 2000);
        }
      });
    }
  }

  confirmToken() {
    let data: ConfirmationToken = {
      confirmationToken: this.confirmationToken,
    };
    if (this.confirmationToken.trim().length > 0) {
      this.registerService.confirmRegister(data).subscribe((x) => {
        if (typeof x === 'string' && x.startsWith('ბმულის')) {
          this.errConfirm = x;
          setTimeout(() => {
            this.errConfirm = '';
          }, 2000);
        } else if (x === false) {
          this.errConfirm = 'აქტივაციის კოდი არასწორია';
          setTimeout(() => {
            this.errConfirm = '';
          }, 2000);
        } else {
          localStorage.setItem('user', JSON.stringify(x));
          this.name = '';
          this.email = '';
          this.idNumber = '';
          this.surname = '';
          this.password = '';
          this.confirmationToken = '';
          this.dataSharingService.sendBool(
            true,
            JSON.parse(localStorage.getItem('user')!)
          );
          this.router.navigate(['/']);
        }
      });
    } else {
      this.errConfirm = 'შეიყვანეთ აქტივაციისს კოდი';
      setTimeout(() => {
        this.errConfirm = '';
      }, 2000);
    }
  }
}
