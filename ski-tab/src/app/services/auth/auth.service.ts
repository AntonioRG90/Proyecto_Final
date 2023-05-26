import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFireDatabase,
    
  ) { }

  user = this.afAuth.authState.pipe( map( authState =>{
    console.log('authState: ', authState);
    if (authState){
      return authState;
    }else{
      return null;
    }
    
  } ))

  glogin(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
    .then( user => {
      console.log('login user:', user);
      if (user.additionalUserInfo!.isNewUser){
        this.insertUserData(user.user);
      }
      
      this.router.navigate(['/home']);
    })
    .catch( error => {
      console.log('login error:', error);
    })
  }

  logout(){
    console.log('logout');
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  insertUserData(user: any){
    console.log('user', user);
    const path = 'users/'+user.uid;
    const userToInsert = {
      email: user.email,
      isActive: false,
      role: false,
    }

    this.db.object(path).set(userToInsert)
    .catch(error => console.log(error));
  }

}
