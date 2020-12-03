import { LocalStorageService } from './../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const APP_KEY = 'APP';
@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor( private localStorageService: LocalStorageService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const appConfig = this.localStorageService.get(APP_KEY, {
        version: '1.2.7',
        mobile: '13215001837',
        launch: false
      });
      if ( appConfig.launch === true ){
        this.router.navigateByUrl('tabs');
        return false;
      }else {
        appConfig.launch = true;
        this.localStorageService.set(APP_KEY , appConfig);
        return true;
      }
  }
}
