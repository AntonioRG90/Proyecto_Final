import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 

@Injectable({
  providedIn: 'root'
})


export class UsersService {

  constructor(
    private db: AngularFireDatabase,


  ) { }

  getUsers(){
    const path = 'users/'
    return this.db.list(path).snapshotChanges();
  }

  removeUser(userUid: any){
    const path = 'users/' + userUid;
    return this.db.object(path).remove();
  }

}
