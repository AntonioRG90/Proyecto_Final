import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Competitions } from 'src/app/models/competitions';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-settings-competitions',
  templateUrl: './settings-competitions.component.html',
  styleUrls: ['./settings-competitions.component.scss']
})
export class SettingsCompetitionsComponent {

  constructor(
    private competitionService: CompetitionsService,
    private usersService: UsersService,
    private cookieService: CookieService,
    private jwt: JwtHelperService,
  ){}

  userToken = this.cookieService.get('accessToken');
  user = this.jwt.decodeToken(this.userToken);
  userId = this.user.user_id; 
  competitions: any [] = [];

  ngOnInit(){
    this.competitionService.getCompetitions(this.userId).subscribe( snap => {
      this.competitions = [];
      snap.forEach( u => {
        const competition: any = u.payload.val();
        this.competitions.push(competition);
      })
    })
  }

  changeStatus(competitionId:any, competitionStatus:boolean){
    this.competitionService.changeStatus(competitionId, competitionStatus);
  }

  deleteCompetition(competitionId:any){
    this.competitionService.deleteCompetition(competitionId);
  }
}