import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CompetitorService } from '../../services/competitor/competitor.service';

@Component({
  selector: 'app-score-competitors',
  templateUrl: './score-competitors.component.html',
  styleUrls: ['./score-competitors.component.scss']
})
export class ScoreCompetitorsComponent {
  constructor(
    private formBuilder: FormBuilder,
    private competitorService: CompetitorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}
  
  scoreCompetitorForm = this.formBuilder.group({
    id: [this.data.competitor.id],
    bib: [this.data.competitor.bib, Validators.required],
    name: [this.data.competitor.name, Validators.required],
    time_seconds: [this.data.competitor.time_seconds, Validators.required],
    time_points: [this.data.competitor.time_points],
    jump1_j4_points: [this.data.competitor.jump1_j4_points, Validators.required] ,
    jump1_j5_points: [this.data.competitor.jump1_j5_points, Validators.required],
    jump1_trick: [this.data.competitor.jump1_trick, Validators.required],
    jump1_dd: [this.data.competitor.jump1_dd, Validators.required],
    jump2_j4_points: [this.data.competitor.jump2_j4_points, Validators.required],
    jump2_j5_points: [this.data.competitor.jump2_j5_points, Validators.required],
    jump2_trick: [this.data.competitor.jump2_trick, Validators.required],
    jump2_dd: [this.data.competitor.jump2_dd, Validators.required],
    jumps_total: [this.data.competitor.jump_total],
    turns_j1_b: [this.data.competitor.turns_j1_b, Validators.required],
    turns_j1_d: [this.data.competitor.turns_j1_d, Validators.required],
    turns_j2_b: [this.data.competitor.turns_j2_b, Validators.required],
    turns_j2_d: [this.data.competitor.turns_j2_d, Validators.required],
    turns_j3_b: [this.data.competitor.turns_j3_b, Validators.required],
    turns_j3_d: [this.data.competitor.turns_j3_d, Validators.required],
    turns_total: [this.data.competitor.turns_total],
    run_score: [this.data.competitor.run_score],
    competitor_of: [this.data.categoryId],
  })

  ngOnInit(){
    console.log(this.data);
  }

  scoreCompetitor(){
    if(!this.scoreCompetitorForm.invalid){
      this.competitorService.updateCompetitor(this.data.competitionId, this.data.categoryId, this.data.paceTime, this.data.gender, this.scoreCompetitorForm.value);
    } 
  }

  deleteCompetitor(competitorId:number){
    this.competitorService.deleteCompetitor(this.data.competitionId, this.data.categoryId, competitorId);
  }

}