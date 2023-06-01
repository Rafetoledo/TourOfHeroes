import { Injectable, Pipe } from "@angular/core";
import { Hero } from "../models/hero.model";
import { HEROES } from "./mock-hero";
import { Observable, finalize, of, tap } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: 'root'
})

export class HeroService{
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    ){}

  getAll(): Observable<Hero[]> {
    return this.http.
    get<Hero[]>(this.heroesUrl).
    pipe(tap((heroes) => this.log(`fetched ${heroes.length} hero(es)`)));
  }

  getHero(id: number):Observable<Hero> {
    return this.http.
    get<Hero>(`${this.heroesUrl}/${id}`).
    pipe(
      tap((hero) => this.log(`fetched${this.descAtttibutes(hero)}`))
    );
  }

  private log (message: string): void{
    this.messageService.add(`HeroService: ${message}`)
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroesUrl}/${hero.id}`,hero)
    .pipe(
      tap((hero) =>
        this.log(`update ${this.descAtttibutes(hero)}`)
      )
    )
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero)
    .pipe(
      tap((hero) =>
      this.log(`created ${this.descAtttibutes(hero)}`)
      )
    );
  }

  private descAtttibutes(hero: Hero): string {
    return `hero id=${hero.id} and name=${hero.name}`;
  }
}
