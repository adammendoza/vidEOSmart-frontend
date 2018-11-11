import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { EosService } from '../services/eos.service';

import { User } from '../models/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private eosService: EosService, public toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.eosService.isUserSessionValid().pipe(
      map(
        (isValid: boolean) => {
          if (isValid === true) {
            return true;
          } else {
            this.showError();
            this.router.navigate(['/home']);
            return false;
          }
        },
        (err: any) => {
          console.log(err);
          this.showError();
          this.router.navigate(['/home']);
          return false;
        }
      )
    );
  }

  showError() {
    this.toastr.error('Please login again!', 'Access Error');
  }
}
