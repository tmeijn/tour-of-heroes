import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { CrisisService } from '../crisis.service';

import { Crisis } from '../shared/crisis.model';

import { slideInDownAnimation } from '../../animations';


@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css'],
  animations: [ slideInDownAnimation ]
})
export class CrisisDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  crisis: Crisis;
  
  constructor(
    private _crisisService: CrisisService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._route.params
      .switchMap((params: Params) => 
        this._crisisService.getHero(+params['id']))
      .subscribe(crisis => this.crisis = crisis);
  }

  private goBack(): void {
    let crisisId = this.crisis ? this.crisis.id : null;
    this._router.navigate(['/heroes', { id: crisisId }]);
  }

  save(): void {
    this._crisisService.update(this.crisis)
      .then(() => this.goBack());
  }


}
