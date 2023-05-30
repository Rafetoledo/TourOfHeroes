import { Injectable } from "@angular/core";
import { Hero } from "../models/hero.model";
import { HEROES } from "./mock-hero";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})

export class HeroService{

  constructor(private messageService: MessageService){}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES)
    this.messageService.add('HeroService: Fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(hero => hero.id === id)!;
    this.messageService.add(`HeroService: Fetched hero id=${{id}}`);
    return of (hero);
  }
}
