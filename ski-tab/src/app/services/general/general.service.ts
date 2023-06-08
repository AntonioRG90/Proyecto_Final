import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  data = new BehaviorSubject(false);
  sharedData = this.data.asObservable();

  show(data:any){
    this.data.next(data);
  }
}
