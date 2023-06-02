import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CompetitorService } from '../../services/competitor/competitor.service';


@Component({
  selector: 'app-create-competitor',
  templateUrl: './create-competitor.component.html',
  styleUrls: ['./create-competitor.component.scss']
})
export class CreateCompetitorComponent {
  constructor(
    private formBuilder: FormBuilder,
    private competitorService: CompetitorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){}


  ngOninit(){
   
  }
  
  createCompetitorForm = this.formBuilder.group({
    id: 0,
    bib: [0, Validators.required],
    name: ["", Validators.required],
    time_seconds: 0,
    time_points: 0,
    jump1_j4_points: 0,
    jump1_j5_points: 0,
    jump1_trick: "",
    jump1_dd: 0,
    jump2_j4_points: 0,
    jump2_j5_points: 0,
    jump2_trick: "",
    jump2_dd: 0,
    jumps_total: 0,
    turns_j1_b: 0,
    turns_j1_d: 0,
    turns_j2_b: 0,
    turns_j2_d: 0,
    turns_j3_b: 0,
    turns_j3_d: 0,
    turns_total: 0,
    run_score: 0,
    competitor_of: 0,
  })

  createCompetitor(){
    if(!this.createCompetitorForm.invalid){
      this.competitorService.createCompetitor(this.data.competitionId, this.data.categoryId, this.createCompetitorForm.value);
    } 
  }
}
