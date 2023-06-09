import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Competitions } from 'src/app/models/competitions';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(
    private db: AngularFireDatabase,
    private idGenerator: IdGeneratorService,
  ) { }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para obtener todas las competiciones de un usuario dado.
   * @param userId 
   * @returns petición a la db.
   */
  getCompetitions(userId:any){
    const path = 'competitions/'
    return this.db.list(path, ref => ref.orderByChild('created_by').equalTo(userId)).snapshotChanges();
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para traer todas las competiciones cuyo estado sea activo
   * @param userId 
   * @returns un array con las competiciones activas.
   */
  getAvailableCompetitions(userId: any){
    const path = 'competitions/'
    return this.db.list(path, ref => ref.orderByChild('created_by').equalTo(userId)).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.val() as Competitions;
          return { ...data };
        }).filter(a =>
          a.status == true
        )
      )
    );
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para traer el estado de una competición dada
   * @param competitionId 
   * @returns boolean con el estado de la competición.
   */
  getCompetitionStatus(competitionId: any){
    const path = 'competitions/' + competitionId;
    return this.db.list(path).snapshotChanges().pipe(
      map(actions =>{
          return actions[6].payload.val();
      })
    );
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos apra borrar la competición pasada como parámetro.
   * @param competitionId 
   * @returns petición a la db.
   */
  deleteCompetition(competitionId: any){
    const path = 'competitions/' + competitionId;
    return this.db.object(path).remove();
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para cambiar el estado de una competición.
   * @param competitionId 
   * @param competitionStatus 
   * @returns petición a la db.
   */
  changeStatus(competitionId: any, competitionStatus: boolean){
    const path = 'competitions/' + competitionId;
    let status = {status: !competitionStatus};
    return this.db.object(path).update(status);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para cambiar el estado de una competición a falso.
   * @param competitionId 
   * @returns petiición a la db.
   */
  setFinishStatus(competitionId: any){
    const path = 'competitions/' + competitionId;
    let status = {status: false};
    return this.db.object(path).update(status);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para crear una competición con los datos pasados por parámetro.
   * @param data 
   * @returns 
   */
  createCompetition (data:any){
    if(data.id == null){
      let id = this.idGenerator.idGenerator();
      data.id = id;
    }
    const path = 'competitions/'+data.id;
    const competition:Competitions ={
      tag: data.tag,
      name: data.name,
      location: data.location,
      date: data.date,
      created_by: data.created_by,
      status: true,
      id: data.id,
    } ;
    return this.db.object(path).update(competition)
    .catch(error => console.log(error));
  }

}
