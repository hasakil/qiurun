import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {StartAppGuard} from "./core/start-app.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./routers/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'welcome', loadChildren: './routers/welcome/welcome.module#WelcomePageModule', canActivate: [StartAppGuard] },
  { path: 'signup', loadChildren: './routers/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './routers/login/login.module#LoginPageModule' },
  { path: 'forgot-password', loadChildren: './routers/forgot-password/forgot-password.module#ForgotPasswordPageModule' },  { path: 'setting', loadChildren: './routers/setting/setting.module#SettingPageModule' },
  { path: 'shop-edit', loadChildren: './routers/shop-edit/shop-edit.module#ShopEditPageModule' },
  { path: 'shop', loadChildren: './routers/shop/shop.module#ShopPageModule' },
  { path: 'category-list', loadChildren: './routers/category-list/category-list.module#CategoryListPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
