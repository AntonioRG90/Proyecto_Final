import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UsersService {

  constructor(
    private db: AngularFireDatabase,
    private jwt: JwtHelperService,
    private cookieService: CookieService,

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
    const user:User ={
      email: snap[0].payload.val(),
      isActive: snap[1].payload.val(),
      role: snap[2].payload.val(),
      uid: snap[3].payload.val(),
    };
    return user;
  }

  tokenIntoUser(){
    let userToken = this.cookieService.get('accessToken');
    let user = this.jwt.decodeToken(userToken);
    return this.getUser(user.user_id).pipe(
      map(snap => {
        return this.snapIntoUser(snap); 
      })
    )
  }

  insertUserData(user: any){
    const path = 'users/'+user.uid;
    const userToInsert:User = {
      uid: user.uid,
      email: user.email,
      isActive: false,
      role: false,
    };
    this.db.object(path).set(userToInsert)
    .catch(error => console.log(error));
  }
}
