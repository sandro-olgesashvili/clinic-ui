import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryNumbers } from '../interface/category';
import { Doctors } from '../interface/doctors';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  categoryNames: CategoryNumbers[] = [];

  doctors: Doctors[] = [];
  doctors2: Doctors[] = [];

  selected: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoryNumbers().subscribe((x) => {
      this.categoryNames = x;
    });

    this.categoryService.getDoctors().subscribe((x) => {
      this.doctors = x;
      this.doctors2 = x;
    });
  }

  onSelect(select: any) {
    if (this.selected === select) {
      this.selected = '';
      this.doctors = this.doctors2;
    } else {
      this.selected = select;
      this.doctors = this.doctors2.filter((x) => x.categoryName === select);
    }
  }
}
