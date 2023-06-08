import { Component, Input } from '@angular/core';
import { CompetitorService } from '../../services/competitor/competitor.service';
import { Competitor } from 'src/app/models/competitor';
import { MatDialog } from '@angular/material/dialog';
import { ScoreCompetitorsComponent } from '../score-competitors/score-competitors.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-competitors-board',
  templateUrl: './competitors-board.component.html',
  styleUrls: ['./competitors-board.component.scss']
})
export class CompetitorsBoardComponent {
  constructor(
    private competitorService: CompetitorService,
    private dialog: MatDialog,
  ){}

  sharedData: [] = [];
  competitors:Competitor [] = [];
  competitionId: number = 0;
  categoryId: number = 0;
  paceTime: number = 0;
  gender: string = "";
  

  ngOnInit(){
    this.getCompetitors();
  }

  ngOnDestroy(){
   
  }

  getCompetitors(){
    this.competitorService.sharedData.subscribe( data => {
      this.competitionId = data[0];
      this.categoryId = data[1];
      this.paceTime = data[2];
      this.gender = data[3];
      this.competitorService.getCompetitors(data[0], data[1]).subscribe((competitors) => {
        this.competitors = competitors;
      })
    })
  }

  openScoreCompetitor(competitionId:number, categoryId:number, paceTime:number, gender:string, competitor:any){
    const dialogRef = this.dialog.open(ScoreCompetitorsComponent,{
      data:{competitionId, categoryId, paceTime, gender, competitor},
      width: '350px',
      panelClass: 'custom-dialog-container',
    })
    dialogRef.afterClosed().subscribe(( )=>{
      
    })
  }
}