import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent implements OnInit {
  emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  nameReg = /^[a-zA-Z]{5,}$/;
  idNumberReg = /^[a-zA-Z0-9]{11}$/;
  passwordReg =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  isUserLoggedIn!: boolean;

  errMsg: string = '';
  succMSg: string = '';
  errConfirm: string = '';

  name!: string;
  email!: string;
  idNumber!: string;
  surname!: string;
  password!: string;
  confirmationToken: string = '';

  formData: FormData = new FormData();
  file!: File | null;

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.file = null;
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
