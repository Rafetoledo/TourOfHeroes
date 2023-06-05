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
    get<Hero>(this.getUrl(id)).
    pipe(
      tap((hero) => this.log(`fetched${this.descAtttibutes(hero)}`))
    );
  }

  private log (message: string): void{
    this.messageService.add(`HeroService: ${message}`)
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.getUrl(hero.id),hero)
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

  deleteHero(hero: Hero): Observable<Hero> {
     const deletedHero = hero;
    return this.http.delete<Hero>(this.getUrl(hero.id))
    .pipe(tap((hero) => this.log(`Deleted ${this.descAtttibutes(deletedHero)}`)))
  }


  searchHero(term: String): Observable<Hero[]> {
    if(!term.trim()){
      return of ([]);
    }

    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((heroes) =>
          heroes.length
            ? this.log(`found ${heroes.length} hero(es) matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        )
      );
  }

  private descAtttibutes(hero: Hero): string {
    console.log(hero);
    return `hero id=${hero.id} and name=${hero.name}`;

  }

  private getUrl(id: number): string {
    return `${this.heroesUrl}/${id}`;
  }
}
