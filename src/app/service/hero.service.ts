import { Injectable } from '@angular/core';
import { catchError, Observable, of, pipe, map, tap  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

import { Hero } from '../component/heroes/hero';
import { HEROES } from '../mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.messageService.addMessage('HeroService: fetched heroes')),
        catchError(this.handleError('getHeroes', [])),
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.messageService.addMessage(`HeroService: fetched hero id=${id}`)),
        catchError(this.handleError<Hero>('getHero')),
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.addMessage(`HeroService: updated hero id=${hero.id}`)),
        catchError(this.handleError('updateHero')),
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.messageService.addMessage(`HeroService: added hero id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero')),
      );
  }

  deleteHero(hero: Hero): Observable<any> {
    return this.http.delete(`${this.heroesUrl}/${hero.id}`, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.addMessage(`HeroService: deleted hero id=${hero.id}`)),
        catchError(this.handleError('deleteHero')),
      );
  }

  searchHeroes(name: string): Observable<Hero[]> {
    if (!name.trim()) return of([]);
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}`)
      .pipe(
        tap(results => results.length 
          ? this.messageService.addMessage(`HeroService: found heroes matching "${name}"`)
          : this.messageService.addMessage(`HeroService: no heroes matching "${name}"`)
        ),
        catchError(this.handleError('searchHero', [])),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.addMessage(`HeroService: ${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
}
