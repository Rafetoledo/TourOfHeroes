import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/core/components/confirmation-dialog/confirmation-dialog.component";
import { DialogData } from "src/app/core/models/dialog-data.model";
import { Hero } from "src/app/core/models/hero.model";
import { HeroService } from "src/app/core/services/hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})

export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'actions'];
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
    ){}

ngOnInit(): void {
  this.getHeroes();
}

getHeroes() {
  this.heroService.getAll().subscribe(heroes => this.heroes = heroes);
}

deleteHero(hero: Hero): void {
  const dialogData: DialogData = {
    cancelText: 'Cancel',
    confirmText: 'Delete',
    content: `Delete '${hero.name}' ?`,
  };
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: dialogData,
    width: '300px'
  })

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.heroService.deleteHero(hero).subscribe(() => {
        //this.heroes = this.heroes.filter( x => x != hero);
        this.getHeroes();
      });
    }
  });
}

onSelected(hero: Hero): void{
  this.deleteHero(hero);
}




}
