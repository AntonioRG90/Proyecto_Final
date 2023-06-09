import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  constructor() { }

  /**
   * @Author Antonio Ruiz Galvez
   * @description genera una id dependiendo del timestamp y una serie de números aleatorios.
   * @returns un number con el cálculo.
   */
  idGenerator(){
   return Date.now()+(Math.floor(Math.random()*100000000));
  }

}
