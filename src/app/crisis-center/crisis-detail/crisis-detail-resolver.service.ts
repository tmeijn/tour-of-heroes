import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

import { CrisisService } from "../crisis.service";
import { Crisis } from "../shared/crisis.model";

@Injectable()
export class CrisisDetailResolver implements Resolve<Crisis> {

  constructor(private _crisisService: CrisisService, private _router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Crisis> {
    let id = route.params['id'];

    return this._crisisService.getCrisis(id).then(crisis => {
      if(crisis) {
        return crisis;
      } else { // id is not found
        this._router.navigate(['/crisis-center']);
        return null;
      }
    });
  }

}
