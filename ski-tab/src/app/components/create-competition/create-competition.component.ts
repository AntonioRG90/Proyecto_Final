import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessengerService } from '../../services/messenger/messenger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';



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
    private messengerService: MessengerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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

  /**
   * @Author Antonio Ruiz Galvez
   * @description si los datos introducidos en el formulario son válidos se comunica con CompetitionService para crear una competición.
   */
  submitForm(){
    if(!this.createCompetition.invalid){
      this.competitionService.createCompetition(this.createCompetition.value);
      this.messengerService.showNotification("Competition saved!", 2000);
    } 
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description abre una modal, si devuelve true se comunica con CompetitionService para eliminar la competición cuyo id es pasado como parámetro.
   * @param id 
   */
  deleteForm(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: 'Delete competition?'
      }
    })
    dialogRef.afterClosed().subscribe( check => {
      if(check) {
        this.competitionService.deleteCompetition(id);
        this.messengerService.showNotification("Competition deleted!", 2000);
      }    
    })
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description abre una modal, si devuelve true se comunica con CompetitionService para cambiar el status a inactivo de la competición 
   * cuyo id es pasado como parámetro.
   * @param id 
   */
  finishCompetition(id:number){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: 'Disable competition?'
      }
    })
    dialogRef.afterClosed().subscribe( check => {
      if(check) {
        this.competitionService.setFinishStatus(id);
        this.messengerService.showNotification('Competition disabled!', 2000);
      }    
    })
  }
}
