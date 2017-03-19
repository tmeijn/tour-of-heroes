import { 
  Component, 
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
 } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private heroService: HeroService,
    private _router: Router
    ) {}

  ngOnInit(): void {
    this.getHeroes();
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

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this._router.navigate(['/detail', this.selectedHero.id]);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    hero.state = 'active';
    this.heroes
      .filter(obj => obj !== hero)
      .map(obj => obj.state = 'inactive');
  } 
}
