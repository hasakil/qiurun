import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageService} from "../shared/services/local-storage.service";
export const APP_KEY: string = 'App';
@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const appConfig: any = this.localStorageService.get(APP_KEY, {
          hasRun: false,
          version: '1.0.0'
      });
      if ( appConfig.hasRun === false ) {
          appConfig.hasRun = true;
          this.localStorageService.set(APP_KEY, appConfig);
          return true;
      } else {
          this.router.navigateByUrl('\home');
      }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
