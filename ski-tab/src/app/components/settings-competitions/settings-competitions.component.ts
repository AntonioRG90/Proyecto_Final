import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';
import { MessengerService } from '../../services/messenger/messenger.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-settings-competitions',
  templateUrl: './settings-competitions.component.html',
  styleUrls: ['./settings-competitions.component.scss']
})
export class SettingsCompetitionsComponent {

  constructor(
    private competitionService: CompetitionsService,
    private cookieService: CookieService,
    private jwt: JwtHelperService,
    private dialog: MatDialog,
    private messengerService: MessengerService,
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: 'Delete competition?'
      }
    })
    dialogRef.afterClosed().subscribe( check => {
      if(check) {
        this.competitionService.deleteCompetition(competitionId);
        this.messengerService.showNotification("Competition deleted!", 2000);
      }    
    })
    
  }
}