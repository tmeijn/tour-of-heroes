import { animate, Component, Input, OnInit, state, style, transition, trigger } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


import { HeroService } from './hero.service';
import { Hero } from './shared/hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
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
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  //color: string = 'blue';

  private selectedId: number;

  constructor(
    private heroService: HeroService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getHeroes();
    
    this.selectedId = +this._activatedRoute.snapshot.params['id'];
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;

    this.heroService.createHero(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
      .then(() => {
        this.heroes = this.heroes.filter(obj => obj !== hero);
        this.selectedHero = null;
      })
  }

  // Retrieves the heroes and sets heroes array. Also updates the animation state.

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => {
      this.heroes = heroes
      this.heroes.forEach(hero => this.isSelected(hero));
    });
  }

  // Navigates to the HeroDetailComponent with the currently selected hero.

  gotoDetail(): void {
    this._router.navigate(['/hero', this.selectedHero.id]);
  }

  // Resets the previous selected hero to active state when returning to the detail component.

  private isSelected(hero: Hero) { 
    if(hero.id === this.selectedId) {
      this.onSelect(hero);
    }
  }

  // Stores the selected hero and sets animantion states to represent selection in view.

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    hero.state = 'active';
    this.heroes
      .filter(obj => obj !== hero)
      .map(obj => obj.state = 'inactive');
  } 
}
