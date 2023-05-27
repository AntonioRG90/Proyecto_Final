import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UsersService } from '../users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/components/custom-snackbar/custom-snackbar.component';
import { map } from 'rxjs';
import { MessengerService } from '../messenger/messenger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFireDatabase,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private messengerService: MessengerService,

  ) { }

  user = this.afAuth.authState.pipe( map( authState =>{
    console.log('authState: ', authState);
    if (authState){
      return authState;
    }else{
      return null;
    }
    
  } ))

  gregister(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
    .then( user => {
      if (user.additionalUserInfo!.isNewUser){
        this.usersService.insertUserData(user.user);
        this.router.navigate(['/login']);
        this.messengerService.showNotification('Your account was registered but you need access! Contact Us',10000);
      }else{
        this.messengerService.showNotification('Your account is already registered!',5000);
      }  
    })
    .catch( error => {
      this.messengerService.showNotification('Error while login!',3000);
    })
  }
  glogin(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
    .then( user => {
      this.usersService.getUser(user.user?.uid).subscribe( snap =>{
        this.usersService.snapIntoUser(snap);
        const userObject = this.usersService.snapIntoUser(snap);
        if (userObject.getIsActive()){
          this.router.navigate(['/home']);
          this.messengerService.showNotification('Login was successful!',3000);
        }else{
          this.messengerService.showNotification('Account disabled! Contact Us',10000);
          this.afAuth.signOut();
          this.router.navigate(['/login']);
        }
      })
    })
    .catch( error => {
      this.messengerService.showNotification('Error while login!',3000);
    })
  }

  gdelete(userUid:any){
    
  }



  logout(){
    this.messengerService.showNotification('Logged out!',3000);
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
