import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { HeroesRoutingModule } from './heroes-routing.module';



@NgModule({
  declarations: [
    HeroesComponent,
    HeroDetailComponent



  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HeroesRoutingModule

  ]
})
export class HeroesModule { }
