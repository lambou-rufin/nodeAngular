import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginRoutes, LoginRoutingModule } from './login-routing.module';
import { SignupComponent } from '../component/signup/signup.component';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from '../component/forgot-password/forgot-password.component';
import { LogginComponent } from '../component/loggin/loggin.component';



@NgModule({
  declarations: [
      SignupComponent,
      LogginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(loginRoutes),
  ]
})
export class LoginModule { }
