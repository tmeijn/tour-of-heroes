import { toPromise } from 'rxjs/operator/toPromise';
import { Headers, Http } from '@angular/http';
import { Crisis } from './shared/crisis.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CrisisService {
  private heroesUrl = 'api/heroes';

  private headers = new Headers({'Content-type': 'application/json'});

  constructor(private _http: Http) { }

  CRISES = [
    new Crisis(1, 'Dragon Burning Cities'),
    new Crisis(2, 'Sky Rains Great White Sharks'),
    new Crisis(3, 'Giant Asteroid Heading For Earth'),
    new Crisis(4, 'Procrastinators Meeting Delayed Again'),
];

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);

    return Promise.reject(error.message || error);
  }

}
