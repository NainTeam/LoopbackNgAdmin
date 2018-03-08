import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoopBackAuth, AdminApi } from '../sdk';
export declare class ApiLoguedGuard implements CanActivate {
    private auth;
    private userApi;
    static valid: boolean;
    constructor(auth: LoopBackAuth, userApi: AdminApi);
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}
