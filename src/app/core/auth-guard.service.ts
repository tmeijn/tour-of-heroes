import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuard#CanActivate called');

    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if(this._authService.isLoggedIn) { return true; }

    this._authService.redirectUrl = url;

    this._router.navigate(['/login']);

    return false;
  }


}
