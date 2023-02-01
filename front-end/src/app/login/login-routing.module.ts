import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogginComponent } from '../component/loggin/loggin.component';
import { SignupComponent } from '../component/signup/signup.component';
import { SharedModule } from '../shared.module';

export const loginRoutes: Routes = [
  { path: '', redirectTo: 'login', 'pathMatch': 'full' },
  // { path: 'signup', component: SignupComponent },
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule]})
export class LoginRoutingModule { }
