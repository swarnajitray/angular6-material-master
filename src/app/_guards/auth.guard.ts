import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
    token: any;
    constructor(private authService: AuthService, private router: Router,private _location: Location) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return this.authService.isLoggedIn().pipe(map(e => {
                console.log(e['authenticated']);
                      if (e['authenticated'] ==true) {   
                        return true;
                      }
                      else
                      {
                        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                        return false;
                      }
                  }))
            //return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}