import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  data = new BehaviorSubject(false);
  sharedData = this.data.asObservable();

  /**
   * @Author Antonio Ruiz Galvez
   * @description cambia el valor de data dependiendo del parámetro.
   * @param data 
   */
  show(data:any){
    this.data.next(data);
  }
}
