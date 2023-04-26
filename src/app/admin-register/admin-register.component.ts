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
  nameReg = /^[a-zA-Zა-ჰ]{5,}$/;
  idNumberReg = /^[a-zA-Z0-9]{11}$/;
  passwordReg =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  isUserLoggedIn!: boolean;

  roleBool: boolean = true;

  role: string = '';
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
  imageName: string = '';
  pdfName: string = '';

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
    this.formData.delete('ImageFile');
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
    this.formData.append('ImageFile', event.target.files[0]);
  }
  onChangePdf(event: any) {
    this.filePdf = null;
    this.formData.delete('PdfFile');
    this.pdfName = event.target.files[0].name;
    this.filePdf = event.target.files[0];
    this.formData.append('PdfFile', event.target.files[0]);
  }

  onSelectRole(data: string) {
    this.role = data;
    this.roleBool = false;
  }
  onSelect() {}

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

    if (this.category !== null) {
      this.formData.append('category', this.category);
    }
    this.formData.append('role', this.role);

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
      if (this.password.trim().length < 1) {
        this.errMsg = 'მიუთითეთ პაროლი';

        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      } else {
        this.errMsg = 'სცადეთ სხვა პაროლი';

        setTimeout(() => {
          this.errMsg = '';
        }, 2000);
      }
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
    } else if (this.role === 'doctor' && !this.filePdf) {
      this.errMsg = 'ატვირთეთ რეზიუმე';

      setTimeout(() => {
        this.errMsg = '';
      }, 2000);
    } else if (this.role === 'doctor' && !this.category) {
      this.errMsg = 'მიუთითეთ კატეგორია';

      setTimeout(() => {
        this.errMsg = '';
      }, 2000);
    } else if (this.role === 'doctor' && !this.description.trim()) {
      this.errMsg = 'მიუთითეთ აღწერა';

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
      this.formData.append('pdfName', this.pdfName);
      this.formData.append('description', this.description);
      this.adminControllerService.createUser(this.formData).subscribe((x) => {
        if (x) {
          this.router.navigate(['/']);
        } else {
          this.errMsg = 'არსებული მეილით მომხმარებელი უკვე არსებობს';
          this.formData.delete('email');
          setTimeout(() => {
            this.errMsg = '';
          }, 2000);
        }
      });
    }
  }
}
