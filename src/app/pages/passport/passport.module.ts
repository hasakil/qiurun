import { ForgetPasswordPage } from './forget-password/forget-password.page';
import { LoginPage } from './login/login.page';
import { SharedModule } from './../../shared/shared.module';
import { SignupPage } from './signup/signup.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';


@NgModule({
  declarations: [
    SignupPage,
    LoginPage,
    ForgetPasswordPage
  ],
  imports: [
    CommonModule,
    PassportRoutingModule,
    SharedModule
  ]
})
export class PassportModule { }
