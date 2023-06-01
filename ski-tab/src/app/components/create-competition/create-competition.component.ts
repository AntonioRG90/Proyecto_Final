import { Component, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.scss']
})

export class CreateCompetitionComponent {
  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private jwt: JwtHelperService,
    private competitionService: CompetitionsService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

    userToken = this.cookieService.get('accessToken');
    user = this.jwt.decodeToken(this.userToken);
    userId = this.user.user_id; 

  ngOninit(){
    console.log(this.data);
  }
  
  createCompetition = this.formBuilder.group({
    tag: [this.data.competition.tag, Validators.required],
    name: [this.data.competition.name, Validators.required],
    location: [this.data.competition.location, Validators.required], 
    date: [this.data.competition.date, Validators.required],
    created_by: [this.userId],
    id: [this.data.competition.id]
  })

  submitForm(){
    if(!this.createCompetition.invalid){
      this.competitionService.createCompetition(this.createCompetition.value);
    } 
  }

  deleteForm(id:number){
    this.competitionService.deleteCompetition(id);
  }

  finishCompetition(id:number){
    this.competitionService.setFinishStatus(id);
  }
}
