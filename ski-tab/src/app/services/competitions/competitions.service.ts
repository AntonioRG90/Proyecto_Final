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

  getCompetitions(userId:any){
    const path = 'competitions/'
    return this.db.list(path, ref => ref.orderByChild('created_by').equalTo(userId)).snapshotChanges();
  }

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

  getCompetition(competitionId: any){
    const path = 'competitions/' + competitionId;
    return this.db.list(path).snapshotChanges();
  }

  deleteCompetition(competitionId: any){
    const path = 'competitions/' + competitionId;
    return this.db.object(path).remove();
  }

  changeStatus(competitionId: any, competitionStatus: boolean){
    const path = 'competitions/' + competitionId;
    let status = {status: !competitionStatus};
    return this.db.object(path).update(status);
  }

  setFinishStatus(competitionId: any){
    const path = 'competitions/' + competitionId;
    let status = {status: false};
    return this.db.object(path).update(status);
  }

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
      id: data.id
    } ;
    return this.db.object(path).update(competition)
    .catch(error => console.log(error));
  }

}
