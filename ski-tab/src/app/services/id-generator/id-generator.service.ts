import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  constructor() { }

  idGenerator(){
   return Date.now()+(Math.floor(Math.random()*100000000));
  }
}
