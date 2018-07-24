import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
// import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const helper = new JwtHelperService();

    const tokenPayload = helper.decodeToken(token);
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    if (tokenPayload.role !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
