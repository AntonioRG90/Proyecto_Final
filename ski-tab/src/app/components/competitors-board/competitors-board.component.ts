import { Component, DestroyRef, inject } from '@angular/core';
import { CompetitorService } from '../../services/competitor/competitor.service';
import { Competitor } from 'src/app/models/competitor';
import { Competitions } from 'src/app/models/competitions';
import { MatDialog } from '@angular/material/dialog';
import { ScoreCompetitorsComponent } from '../score-competitors/score-competitors.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompetitionsService } from 'src/app/services/competitions/competitions.service';

@Component({
  selector: 'app-competitors-board',
  templateUrl: './competitors-board.component.html',
  styleUrls: ['./competitors-board.component.scss']
})
export class CompetitorsBoardComponent {
  constructor(
    private competitorService: CompetitorService,
    private competitionsService: CompetitionsService,
    private dialog: MatDialog,
  ){}

  competitors:Competitor [] = [];
  competitionStatus: any = false;;
  competitionId: number = 0;
  categoryId: number = 0;
  paceTime: number = 0;
  gender: string = "";
  private destroyRef = inject(DestroyRef);

  ngOnInit(){
   this.getCompetitors();
   
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con CompetitionService para subscribirse a una observable y obtener los datos necesarios para comunicarse
   * con CompetitorService y traer todos los competidores dependiendo de la categoría y competición y obtiene el estado de dicha competición.
   */
  getCompetitors(){
    this.competitorService.sharedData
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe( data => {
      this.competitionId = data[0];
      this.categoryId = data[1];
      this.paceTime = data[2];
      this.gender = data[3];
      this.competitorService.getCompetitors(data[0], data[1]).subscribe((competitors) => {
        this.competitors = competitors;
      })
      this.competitionsService.getCompetitionStatus(data[0]).subscribe( snap => {
        this.competitionStatus = snap;
      })
    })
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description abre ScoreCompetitorsComponent y le pasa como datos los parámetros
   * @param competitionId 
   * @param categoryId 
   * @param paceTime 
   * @param gender 
   * @param competitor 
   */
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