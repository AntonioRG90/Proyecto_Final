import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/classes/user.class';

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

  getUser(userUid: any){
    const path = 'users/' + userUid;
    return this.db.list(path).snapshotChanges();
  }

  removeUser(userUid: any){
    const path = 'users/' + userUid;
    return this.db.object(path).remove();
  }

  changeStatus(userUid: any, userStatus: boolean){
    const path = 'users/' + userUid;
    let isActive = {isActive: !userStatus};
    return this.db.object(path).update(isActive);
  }

  changeRole(userUid: any, userRole: boolean){
    const path = 'users/' + userUid;
    let role = {role: !userRole};
    return this.db.object(path).update(role);
  }

  snapIntoUser(snap: any){
    return new User(
      snap[0].payload.val(),
      snap[1].payload.val(),
      snap[2].payload.val(),
    )
  }

  insertUserData(user: any){
    const path = 'users/'+user.uid;
    const userToInsert = new User(
      user.email,
      false,
      false,
    )
    this.db.object(path).set(userToInsert)
    .catch(error => console.log(error));
  }


}
