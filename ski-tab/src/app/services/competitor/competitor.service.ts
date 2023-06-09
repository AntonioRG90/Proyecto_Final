import { Injectable } from '@angular/core';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { Competitor } from 'src/app/models/competitor';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, map } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CompetitorService {

  constructor(
    private idGenerator: IdGeneratorService,
    private db: AngularFireDatabase,
   
  ) { }

  data = new BehaviorSubject([]);
  sharedData = this.data.asObservable();
  
  dd:{[index: string]: any} = {
    '3': [0.68, 0.78],
    '3p': [0.71, 0.81],
    '3G': [0.82, 0.92],
    '7': [0.85, 0.95],
    '7p': [0.88, 0.98],
    '7G': [1.01, 1.11],
    '10': [1.02, 1.12],
    '10p': [1.05, 1.06],
    '10G': [1.20, 1.30],
    '3o': [0.68, 0.78],
    '3oG': [0.82, 0.92],
    '7o': [0.85, 0.95],
    '7op': [0.88, 0.98],
    '7oG': [1.01, 1.11],
    '10o': [1.02, 1.12],
    '10op': [1.05, 1.15],
    '10oG': [1.20, 1.30],
    '14o': [1.19, 1.29],
    '14op': [1.22, 1.32], 
    '14oG': [1.39, 1.49],
    'bP': [0.68, 0.78],
    'bT': [0.68, 0.78],
    'bL': [0.71, 0.81],
    'bp': [0.71, 0.81],
    'bG': [0.82, 0.92],
    'bF': [0.88, 0.98],
    'bdF': [1.05, 1.15],
    'btF': [1.22, 1.32],
    'fT': [0.68, 0.78], 
    'fP': [0.68, 0.78],
    'fp': [0.71, 0.81],
    'fG': [0.82, 0.92],
    'fF': [0.88, 0.98],
    'l': [0.68, 0.78],
    'lp': [0.71, 0.81],
    'lG': [0.82, 0.92],
    'lF': [0.85, 0.95],
    'lpF': [0.88, 0.98],
    'lGF': [1.01, 1.11],
  };
  timePoints = 0;
  airPoints = 0;
  turnPoints = 0;

   ngOnInit(){
    
   }

  /**
   * @Author Antonio Ruiz Galvez
   * @description actualiza en la base de datos los parámetros porporcionados por de data de un competidor.
   * @param competitionId 
   * @param categoryId 
   * @param paceTime 
   * @param gender 
   * @param data 
   * @returns petición a la db.
   */
  updateCompetitor(competitionId:number, categoryId:number, paceTime:number, gender: string, data: any){
    if(data.id == null){
      let id = this.idGenerator.idGenerator()+data.bib;
      data.id = id;
    }
    
    const path = 'competitions/'+ competitionId + '/categories/' + categoryId +'/competitors/' + data.id;
    const competitor:Competitor ={
      id: data.id,
      bib: data.bib,
      name: data.name,
      time_seconds: data.time_seconds,
      time_points: this.calculateTimePoints(data.time_seconds, paceTime),
      jump1_j4_points: data.jump1_j4_points,
      jump1_j5_points: data.jump1_j5_points,
      jump1_trick: data.jump1_trick,
      jump1_dd: this.getDD(data.jump1_trick, gender),
      jump2_j4_points: data.jump2_j4_points,
      jump2_j5_points: data.jump2_j5_points,
      jump2_trick: data.jump2_trick,
      jump2_dd: this.getDD(data.jump2_trick, gender),
      jumps_total: this.calculateAirScore(data.jump1_j4_points, data.jump1_j5_points, data.jump1_trick, data.jump2_j4_points, data.jump2_j5_points, data.jump2_trick, gender),
      turns_j1_b: data.turns_j1_b,
      turns_j1_d: data.turns_j1_d,
      turns_j2_b: data.turns_j2_b,
      turns_j2_d: data.turns_j2_d,
      turns_j3_b: data.turns_j3_b,
      turns_j3_d: data.turns_j3_d,
      turns_total: this.calculateTurnsPoints(data.turns_j1_b, data.turns_j1_d, data.turns_j2_b, data.turns_j2_d, data.turns_j3_b, data.turns_j3_d),
      run_score: this.calculateRunScore(),
      competitor_of: data.competitor_of,
    } ;
    return this.db.object(path).update(competitor)
    .catch(error => console.log(error));
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para crear un nuevo competidor con los datos proporcionados por los parámetros.
   * @param competitionId 
   * @param categoryId 
   * @param data 
   * @returns petición a la db.
   */
  createCompetitor(competitionId:number, categoryId:number, data:any){
    data.id = this.idGenerator.idGenerator()+data.bib
    const path = 'competitions/'+ competitionId + '/categories/' + categoryId +'/competitors/' + data.id;
    const competitor:Competitor ={
      id: data.id,
      bib: data.bib,
      name: data.name,
      time_seconds: data.time_seconds,
      time_points: data.time_points,
      jump1_j4_points: data.jump1_j4_points,
      jump1_j5_points: data.jump1_j5_points,
      jump1_trick: data.jump1_trick,
      jump1_dd: data.jump1_dd,
      jump2_j4_points: data.jump2_j4_points,
      jump2_j5_points: data.jump2_j5_points,
      jump2_trick: data.jump2_trick,
      jump2_dd: data.jump2_dd,
      jumps_total: data.jumps_total,
      turns_j1_b: data.turns_j1_b,
      turns_j1_d: data.turns_j1_d,
      turns_j2_b: data.turns_j2_b,
      turns_j2_d: data.turns_j2_d,
      turns_j3_b: data.turns_j3_b,
      turns_j3_d: data.turns_j3_d,
      turns_total: data.turns_total,
      run_score: data.run_score,
      competitor_of: data.competitor_of,
    } ;
    return this.db.object(path).update(competitor)
    .catch(error => console.log(error));
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description cambia el valor de data por el parámetro proporcionado.
   * @param data
   */
  shareDataToBoard(data:any){
    this.data.next(data);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para obtener los competidores según los parametros dados.
   * @param competitionId 
   * @param categoryId 
   * @returns [Competitor].
   */
  getCompetitors(competitionId:number, categoryId:number){
    const path = 'competitions/'+ competitionId + '/categories/' + categoryId +'/competitors/';
    return this.db.list(path, ref =>{return ref.orderByChild('bib')}).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.val() as Competitor;
          return { ...data };
        })
      )
    )
  }

   /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para obtener los competidores según los parametros dados, ordenados por su puntuación total.
   * @param competitionId 
   * @param categoryId 
   * @returns [Competitor].
   */
  getCompetitorsOrder(competitionId:number, categoryId:number){
    const path = 'competitions/'+ competitionId + '/categories/' + categoryId +'/competitors/';
    return this.db.list(path, ref =>{return ref.orderByChild('run_score')}).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.val() as Competitor;
          return { ...data };
        })
      )
    )
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos borrar el competidor pasado por parámetro.
   * @param competitionId 
   * @param categoryId 
   * @param competitorId 
   * @returns petición a la db.
   */
  deleteCompetitor(competitionId:number, categoryId: number, competitorId:number){
    const path = 'competitions/' + competitionId + '/categories/' + categoryId + '/competitors/' + competitorId;
    return this.db.object(path).remove();
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para eliminar todos los competidores de una categoría determinada.
   * @param competitionId 
   * @param categoryId 
   * @returns petición a la db.
   */
  deleteAllCompetitors(competitionId:number, categoryId:number){
    const path = 'competitions/' + competitionId + '/categories/' + categoryId + '/competitors/';
    return this.db.object(path).remove();
  }
  
  /**
   * @Author Antonio Ruiz Galvez
   * @description calcula los puntos de tiempo segun los parámetros dados.
   * @param time 
   * @param paceTime 
   * @returns float con el resultado.
   */
  calculateTimePoints(time:number, paceTime:number){
    let t = 48-32*(time/paceTime);
    let t1 = t.toFixed(2);
    this.timePoints = parseFloat(t1);
    return parseFloat(t1);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description calcula los puntos de tiempo segun los parámetros dados.
   * @param j1b 
   * @param j1d 
   * @param j2b 
   * @param j2d 
   * @param j3b 
   * @param j3d 
   * @returns float con el resultado.
   */
  calculateTurnsPoints(j1b:number, j1d:number, j2b:number, j2d:number, j3b:number, j3d:number,){
    let points = +((j1b-j1d)+(j2b-j2d)+(j3b-j3d)).toFixed(2);
    this.turnPoints = points > 0? points: 0.1;
    return points > 0? points: 0.1;
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description toma dependiendo del genero los datos almacenados en la variable dd.
   * @param dd 
   * @param gender 
   * @returns contenido de la variable dependiendo del género.
   */
  getDD(dd:any, gender:string){
    if(gender == 'men'){
      return this.dd[dd][0];
    }else{
      return this.dd[dd][1];
    } 
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description calcula los puntos de aire según los parámetros proporcionados.
   * @param j1j4 
   * @param j1j5 
   * @param j1dd 
   * @param j2j4 
   * @param j2j5 
   * @param j2dd 
   * @param gender 
   * @returns float del resultado.
   */
  calculateAirScore(j1j4:number, j1j5:number, j1dd:any, j2j4:number, j2j5:number, j2dd:any, gender:string){
      let j1Points = (((j1j4*1.0)+(j1j5*1.0))/2)*this.getDD(j1dd, gender);
      let j2Points = +(((j2j4*1.0)+(j2j5*1.0))/2)*this.getDD(j2dd, gender);
      this.airPoints = parseFloat((j1Points+j2Points).toFixed(2));
      return parseFloat((j1Points+j2Points).toFixed(2));
    
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description suma todos los resultados de las funciones de cálculo anteriores.
   * @returns float con la puntuación total.
   */
  calculateRunScore(){
    return parseFloat((this.timePoints + this.airPoints + this.turnPoints).toFixed(2));
  }
}