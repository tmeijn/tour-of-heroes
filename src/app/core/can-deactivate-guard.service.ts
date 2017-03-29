import { Observable } from 'rxjs/Rx';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() { }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
