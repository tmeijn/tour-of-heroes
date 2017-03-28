import { animate, Component, Input, OnInit, state, style, transition, trigger } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


import { CrisisService } from './crisis.service';
import { Crisis } from './shared/crisis.model';

@Component({
  selector: 'app-crises',
  templateUrl: './crises.component.html',
  styleUrls: ['./crises.component.css'],
  animations: [
    trigger('crisisState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms ease-out')
      ]),
      transition(':leave', [
        animate(200, style({ transform: 'translateX(200%)', opacity: '0' }))
      ])
    ])
  ]
})
export class CrisesComponent implements OnInit {
  title = 'Tour of crises';
  crises: Crisis[];
  selectedCrisis: Crisis;
  //color: string = 'blue';

  private selectedId: number;

  constructor(
    private crisisService: CrisisService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getCrises();
    
    this.selectedId = +this._activatedRoute.snapshot.params['id'];
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;

    this.crisisService.createCrisis(name)
      .then(crisis => {
        this.selectedCrisis = null;
      })
  }

  // delete(crisis: crisis): void {
  //   this.heroService.deleteHero(crisis)
  //     .then(() => {
  //       this.crises = this.crises.filter(obj => obj !== crisis);
  //       this.selectedHero = null;
  //     })
  // }

  // // Retrieves the crises and sets crises array. Also updates the animation state.

  getCrises(): void {
    this.crisisService.getCrises().then(crises => {
      this.crises = crises
      this.crises.forEach(crisis => this.isSelected(crisis));
    });
  }

  // // Resets the previous selected crisis to active state when returning to the detail component.

  private isSelected(crisis: Crisis) { 
    if(crisis.id === this.selectedId) {
      this.onSelect(crisis);
    }
  }

  // // Stores the selected crisis and sets animantion states to represent selection in view.

  onSelect(crisis: Crisis): void {
    this.selectedCrisis = crisis;
    crisis.state = 'active';
    this.crises
      .filter(obj => obj !== crisis)
      .map(obj => obj.state = 'inactive');

    this._router.navigate([crisis.id], { relativeTo: this._activatedRoute })
  } 
}
