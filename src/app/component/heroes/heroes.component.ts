import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from 'src/app/service/hero.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string) {
    const heroName = name.trim();
    if (!name) return;
    this.heroService.addHero({ name: heroName } as Hero).subscribe(_ => this.getHeroes());
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe(_ => this.getHeroes());
  }
}
