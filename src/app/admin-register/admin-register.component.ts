import { Component, OnInit } from '@angular/core';
import { AdminControllerService } from '../service/admin-controller.service';
import { Category } from '../interface/category';
import { AdminCreateUser } from '../interface/admin-create-user';
import { Router } from '@angular/router';

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

  roleBool: boolean = true;

  role: string | null = null;
  category: string | null = null;
  categories: Category[] = [];

  errMsg: string = '';
  succMSg: string = '';
  errConfirm: string = '';

  name: string = '';
  email: string = '';
  idNumber: string = '';
  surname: string = '';
  password: string = '';
  confirmationToken: string = '';
  description: string = '';

  formData: FormData = new FormData();
  file!: File | null;
  filePdf!: File | null;

  constructor(
    private adminControllerService: AdminControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminControllerService.getCategory().subscribe((x) => {
      this.categories = x;
    });
  }

  onChange(event: any) {
    this.file = null;
    this.file = event.target.files[0];
    console.log(this.file);
  }
  onChangePdf(event: any) {
    this.filePdf = null;
    this.filePdf = event.target.files[0];
    console.log(this.filePdf);
  }

  onSelectRole(data: string) {
    this.role = data;
    this.roleBool = false;
  }
  onSelect() {
    console.log(this.category);
  }

  onCreateUser() {
    const data: AdminCreateUser = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      idNumber: this.idNumber,
      password: this.password,
      role: this.role,
      category: this.category,
    };

    if (
      !this.name.trim() ||
      !this.surname.trim() ||
      !this.email.trim() ||
      !this.idNumber.trim() ||
      !this.password.trim() ||
      !(this.role === 'doctor' ? this.category !== null : true)
    ) {
      this.errMsg = 'შეავსეთ ყველა ველი';
      setTimeout(() => {
        this.errMsg = '';
      }, 2000);
    } else {
      this.adminControllerService.createUser(data).subscribe((x) => {
        console.log(x);
        this.router.navigate(['/']);
      });
    }
  }
}
