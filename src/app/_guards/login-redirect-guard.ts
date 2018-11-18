import {CanActivate,Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from '../auth-services/auth.service';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable()
export class loginRedirectGuard implements CanActivate { 
  constructor(private authService: AuthService,private router :Router,private _location: Location) {}; 

  canActivate() {
   
    return this.authService.isLoggedIn().pipe(map(e => {
      console.log(e['authenticated']);
            if (e['authenticated'] ==true) {   
                this._location.back();
            }
            else
            {
               return true;
            }
        }))
  }
}