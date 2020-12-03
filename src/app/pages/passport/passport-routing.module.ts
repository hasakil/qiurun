import { ForgetPasswordPage } from './forget-password/forget-password.page';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'signup',
    component: SignupPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'forget-password',
    component: ForgetPasswordPage,
    // loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
