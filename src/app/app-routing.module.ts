import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { CategoryComponent } from './category/category.component';
import { AdminGuard } from './service/admin.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'clinic', component: RegisterComponent },
  {
    path: 'adminregister',
    component: AdminRegisterComponent,
    canActivate: [AdminGuard],
  },
  { path: 'category', component: CategoryComponent, canActivate: [AdminGuard] },
  { path: 'profile/:id', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
