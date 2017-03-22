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
    trigger('heroState', [
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
  selectedHero: Crisis;
  //color: string = 'blue';

  private selectedId: number;

  constructor(
    private heroService: CrisisService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    // this.getcrises();
    
    // this.selectedId = +this._activatedRoute.snapshot.params['id'];
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if(!name) return;

  //   this.heroService.createHero(name)
  //     .then(crisis => {
  //       this.crises.push(crisis);
  //       this.selectedHero = null;
  //     })
  // }

  // delete(crisis: crisis): void {
  //   this.heroService.deleteHero(crisis)
  //     .then(() => {
  //       this.crises = this.crises.filter(obj => obj !== crisis);
  //       this.selectedHero = null;
  //     })
  // }

  // // Retrieves the crises and sets crises array. Also updates the animation state.

  // getcrises(): void {
  //   this.heroService.getcrises().then(crises => {
  //     this.crises = crises
  //     this.crises.forEach(crisis => this.isSelected(crisis));
  //   });
  // }

  // // Navigates to the HeroDetailComponent with the currently selected crisis.

  // gotoDetail(): void {
  //   this._router.navigate(['/crisis', this.selectedHero.id]);
  // }

  // // Resets the previous selected crisis to active state when returning to the detail component.

  // private isSelected(crisis: crisis) { 
  //   if(crisis.id === this.selectedId) {
  //     this.onSelect(crisis);
  //   }
  // }

  // // Stores the selected crisis and sets animantion states to represent selection in view.

  // onSelect(crisis: crisis): void {
  //   this.selectedHero = crisis;
  //   crisis.state = 'active';
  //   this.crises
  //     .filter(obj => obj !== crisis)
  //     .map(obj => obj.state = 'inactive');
  // } 
}
