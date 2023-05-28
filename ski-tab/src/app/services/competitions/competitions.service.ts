import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Competitions } from 'src/app/classes/competitions';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getCompetitions(userId:any){
    const path = 'competitions/'
    return this.db.list(path).snapshotChanges();
  }

  getCompetition(userId:any, competitionId: any){
    const path = 'competitions/' + competitionId;
    return this.db.list(path).snapshotChanges();
  }

  removeCompetition(userId:any, competitionId: any){
    const path = 'competitions/' + competitionId;
    return this.db.object(path).remove();
  }

  changeStatus(userId:any, competitionId: any, competitionStatus: boolean){
    const path = 'competitions/' + competitionId;
    let isActive = {isActive: !competitionStatus};
    return this.db.object(path).update(isActive);
  }

  createCompetition (userId: any, data:any){
    const path = 'competitions/'
    const competition:Competitions ={
      tag: data.tag,
      name: data.name,
      location: data.location,
      created_by: userId,
    } ;
    return this.db.object(path).set(competition)
    .catch(error => console.log(error));
  }

}
