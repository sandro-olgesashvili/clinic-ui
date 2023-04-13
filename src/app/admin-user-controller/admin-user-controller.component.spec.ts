import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserControllerComponent } from './admin-user-controller.component';

describe('AdminUserControllerComponent', () => {
  let component: AdminUserControllerComponent;
  let fixture: ComponentFixture<AdminUserControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserControllerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
