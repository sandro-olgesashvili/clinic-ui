import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { DoctorProfile, Doctors } from '../interface/doctors';

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

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
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
}
