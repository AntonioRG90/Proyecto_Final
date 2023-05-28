import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompetitionComponent } from '../create-competition/create-competition.component';

@Component({
  selector: 'app-aside-navbar',
  templateUrl: './aside-navbar.component.html',
  styleUrls: ['./aside-navbar.component.scss']
})
export class AsideNavbarComponent {
  constructor(
    private dialog: MatDialog,
  ){

  }
  openCreateCompetition(){
    const dialogRed = this.dialog.open(CreateCompetitionComponent,{

    })
  }
}
