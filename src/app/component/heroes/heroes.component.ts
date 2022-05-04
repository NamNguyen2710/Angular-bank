import { Component } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from 'src/app/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero: Hero = {
    id: 1,
    name: 'Windstorm',
  };

  constructor() { }

  selectHero(hero: Hero) {
    this.selectedHero = hero;
  }
}
