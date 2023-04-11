import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { DoctorProfile, Doctors } from '../interface/doctors';
import { AdminControllerService } from '../service/admin-controller.service';
import { MessageService } from 'primeng/api';

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

  passwordBool: boolean = false;

  ls = JSON.parse(localStorage.getItem('user')!);

  password: string = '';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private adminControllerService: AdminControllerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const data: DoctorProfile = { id: Number(paramMap.get('id')) };

      this.doctorService.getDoctorProfile(data).subscribe((x) => {
        this.profile = x;
        console.log(this.profile);
      });
    });
  }

  onPassword() {
    this.passwordBool = !this.passwordBool;
  }
  onCancel() {
    this.passwordBool = false;
  }

  onPasswordChange() {
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
        }
      });
  }
}
