import { AuthService } from './auth.service';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    NavigationExtras,
    Route,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canLoad(_route: Route): boolean {
    let url = `/${_route.path}`;

    return this.checkLogin(url);
  }

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

    // Create a dummy session id
    let sessionId = 123456789;

    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    }

    this._router.navigate(['/login'], navigationExtras);

    return false;
  }


}
