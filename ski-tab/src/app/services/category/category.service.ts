import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { Category } from 'src/app/models/category';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private db: AngularFireDatabase,
    private idGenerator: IdGeneratorService,
  ) { }

  getCategories(competitionId:any){
    const path = 'competitions/'+competitionId+'/categories/';
    return this.db.list(path).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.val() as Category;
          return { ...data };
        })
      )
    );
  }

  deleteCategory(competitionId:number, categoryId: number){
    const path = 'competitions/' + competitionId + '/categories/' + categoryId;
    return this.db.object(path).remove();
  }

  createCategory (competitionId:any, data:any){
    if(data.id == null){
      let id = this.idGenerator.idGenerator();
      data.id = id;
    }
    const path = 'competitions/'+competitionId+'/categories/'+data.id;
    const category:Category ={
      tag: data.tag,
      name: data.name,
      gender: data.gender,
      slope_distance: data.slope_distance,
      pace_time: this.calculatePaceTime(data.gender, data.slope_distance),
      id: data.id,
      category_of: competitionId,
    } ;
    
    return this.db.object(path).update(category)
    .catch(error => console.log(error));
  }

  calculatePaceTime(gender:string, slopeDistance:any){
    let paceTimeByGender = gender === "men"? 10.30 : 8.80;
    return +(slopeDistance/paceTimeByGender).toFixed(2);
  }

 
}