import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from 'firebase/auth';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { MessengerService } from '../messenger/messenger.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MailService } from '../mail/mail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private usersService: UsersService,
    private messengerService: MessengerService,
    private http: HttpClient,
    private cookieService: CookieService,
    private mailService: MailService,

  ) { }
  
   /**
   * @Author Antonio Ruiz Galvez
   * @description abre una ventana para registrarse en la app a través de Google, si es usuario es nuevo crea un User es nuestra
   *              base de datos. Si es falso significa que el usuario ya está registrado.
   */
  gregister(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
    .then( user => {
      if (user.additionalUserInfo!.isNewUser){
        this.mailService.activationMail(user.user?.email).subscribe();
        this.usersService.insertUserData(user.user);
        this.router.navigate(['/login']);
        this.messengerService.showNotification('Your account was registered but you need access! We will activate it in 48h max.',5000);
      }else{
        this.messengerService.showNotification('Your account is already registered!',2000);
      }  
    })
    .catch( error => {
      this.messengerService.showNotification('Error while registering!',2000);
    })
  }
  
  /**
   * @Author Antonio Ruiz Galvez
   * @description abre una ventana de Google para hacer login, si es usuario no está registrado en nuestra base de datos le pide que se registre.
   *              Si el usuario ya está registrado comprueba en la base de datos que el estado de este sea activo, si lo es accede a la app y se 
   *              guarda en las cookies su token, sino le informa de que su cuenta está deshabilitada.        
   */
  glogin(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
    .then( user => {
      if(user.additionalUserInfo?.isNewUser){
        this.afAuth.currentUser.then(user => user?.delete());
        this.afAuth.signOut();
        this.messengerService.showNotification('You have to register first!',3000);
      }else{
        this.usersService.getUser(user.user?.uid).subscribe( snap =>{
          const userDB = this.usersService.snapIntoUser(snap);
          if (userDB.isActive){
            user.user?.getIdToken().then(
              token => {
                this.cookieService.set('accessToken', token, 1, '/');
                this.router.navigate(['/home']);
                this.messengerService.showNotification('Login was successful!',2000);
              }
            )
          }else{
            this.messengerService.showNotification('Account disabled! Contact Us',5000);
            this.afAuth.signOut();
            this.router.navigate(['/login']);
          }
        })
      }
    })
    .catch( error => {
      this.messengerService.showNotification('Error while login!',2000);
    })
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description envía una petición a una Cloud Function almacenada en Firebase.
   * @param userEmail 
   * @returns se comunica con la Cloud Function y elimina al usuario cuyo mail es pasado como parámetro.
   */
  gdelete(userEmail:any) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post('https://us-central1-skitab-57521.cloudfunctions.net/deleteUser', userEmail, httpOptions);
  } 

  /**
   * @Author Antonio Ruiz Galvez
   * @description acaba la sesión de un usuario y elimina su token de las cookies.
   */
  logout(){
    this.messengerService.showNotification('Logged out!',2000);
    this.router.navigate(['/login']);
    this.afAuth.signOut();
    this.cookieService.delete('accessToken');
  }
}
