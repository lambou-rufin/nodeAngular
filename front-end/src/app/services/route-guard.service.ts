import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Globalconstants } from '../global-constants';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService,
    public router: Router,
    private snackbarService: SnackbarService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // let expectedRoleArray: any = route.data;
    const token: any = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    } else {

      this.router.navigate(['/']);
    }
    return true;
    // var tokenPayload: any;
    // try {
    //   tokenPayload = jwt_decode(token);
    // }
    // catch (err) {
    //   localStorage.clear();
    //   this.router.navigate(['/']);
    // }
    // let checkRole = false;
    // for (let i = 0; i < expectedRoleArray.lenght; i++) {
    //   if (expectedRoleArray[i] == tokenPayload.role) {
    //     checkRole = true;
    //   }
    // }
    // if (tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
    //   if (this.auth.isAuthenticated() && checkRole) {
    //     return true;
    //   }
    //   this.snackbarService.openSnackBar(Globalconstants.unauthorized, Globalconstants.error);
    //   this.router.navigate(['/']);
    //   return false;
    // }
    // else {
    //   this.router.navigate(['/']);
    //   localStorage.clear();
    //   return false;
    // }
  }
}
