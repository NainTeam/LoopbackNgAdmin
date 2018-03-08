import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoopBackAuth, AdminApi } from '../sdk';

@Injectable()
export class ApiLoguedGuard implements CanActivate {

  static valid = false;
  constructor(private auth: LoopBackAuth, private userApi: AdminApi) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!ApiLoguedGuard.valid) {
      const user = this.auth.getCurrentUserData();
      const token = this.auth.getToken();
      return this.userApi.getCurrent().toPromise().then(user => {
        ApiLoguedGuard.valid = true;
        return true;
      }, err => {
        return false;
      });
    }
    else {
      return true;
    }
  }
}
