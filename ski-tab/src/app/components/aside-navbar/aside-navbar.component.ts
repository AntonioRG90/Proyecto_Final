import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCompetitionComponent } from '../create-competition/create-competition.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-aside-navbar',
  templateUrl: './aside-navbar.component.html',
  styleUrls: ['./aside-navbar.component.scss']
})
export class AsideNavbarComponent {
   
  constructor(
    private dialog: MatDialog,
    private cookieService: CookieService,
    private jwt: JwtHelperService,
    private competitionService: CompetitionsService,
    private router: Router,
  ){}

  userToken = this.cookieService.get('accessToken');
  user = this.jwt.decodeToken(this.userToken);
  userId = this.user.user_id; 
  competitions: any[] = [];
  competitionsFiltered: any[] = [];
  hideCategory: any [] = [];
  emptyData: any[] = [];

  ngOnInit(){
    this.competitionService.getCompetitions(this.userId)
    .subscribe((snap) => {
      snap.forEach( u => {
        const competition = u.payload.val();
        this.competitions.push(competition);
      })
    })

    this.competitionService.getAvailableCompetitions(this.userId).subscribe((snap) => {
      this.competitionsFiltered.push(snap);
    } )
  }

  openCreateCompetition(competition?: any){
    const dialogRef = this.dialog.open(CreateCompetitionComponent,{
      width: '350px',
      data: {competition},
    })
    dialogRef.afterClosed().subscribe(( )=>{
      window.location.reload();
    })
  }

  showHide(id:number){
    this.hideCategory[id] == true ? this.hideCategory[id] = false : this.hideCategory[id] = true;
  }
  
}
