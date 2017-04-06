import { DialogService } from '../../shared/dialog.service';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Params, Router } from '@angular/router';
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
export class CrisisDetailComponent implements OnInit, CanDeactivate<CrisisDetailComponent> {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  crisis: Crisis;
  editName: string;
  
  constructor(
    private _crisisService: CrisisService,
    private _dialogService: DialogService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      })
  }

  canDeactivate(): Promise<boolean> | boolean {
    if(!this.crisis || this.crisis.name === this.editName) {
      return true;
    }

    return this._dialogService.confirm('Discard changes?');
  }

  private goBack(): void {
    let crisisId = this.crisis ? this.crisis.id : null;
    this._router.navigate(['/crisis-center', { id: crisisId }]);
  }

  save(): void {
    // //this._crisisService.update(this.crisis)
    //   .then(() => this.goBack());
    this.crisis.name = this.editName;
    this.goBack();
  }


}
