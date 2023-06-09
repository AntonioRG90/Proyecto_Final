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

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos apra obtener todos los usuarios.
   * @returns snap con todos los usuarios.
   */
  getUsers(){
    const path = 'users/'
    return this.db.list(path).snapshotChanges();
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para traer un usuario dado.
   * @param userUid 
   * @returns snap con el usuario.
   */
  getUser(userUid: any){
    const path = 'users/' + userUid;
    return this.db.list(path).snapshotChanges();
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para eliminar el usuario dado.
   * @param userUid 
   * @returns petición a la db.
   */
  removeUser(userUid: any){
    const path = 'users/' + userUid;
    return this.db.object(path).remove();
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para cambiar el estado de un usuario dado.
   * @param userUid 
   * @param userStatus 
   * @returns petición a la db.
   */
  changeStatus(userUid: any, userStatus: boolean){
    const path = 'users/' + userUid;
    let isActive = {isActive: !userStatus};
    return this.db.object(path).update(isActive);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para cambiar el rol de un usuario dado.
   * @param userUid 
   * @param userRole 
   * @returns petición a la db.
   */
  changeRole(userUid: any, userRole: boolean){
    const path = 'users/' + userUid;
    let role = {role: !userRole};
    return this.db.object(path).update(role);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description convierte un snap a un objeto User.
   * @param snap 
   * @returns un objeto User.
   */
  snapIntoUser(snap: any){
    const user:User ={
      email: snap[0].payload.val(),
      isActive: snap[1].payload.val(),
      role: snap[2].payload.val(),
      uid: snap[3].payload.val(),
    };
    return user;
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description obtenemos el token de usuario de las cookies y ejecutamos una función para traernos el usuario correspondiente a dicho token.
   * @returns objecto User.
   */
  tokenIntoUser(){
    let userToken = this.cookieService.get('accessToken');
    let user = this.jwt.decodeToken(userToken);
    return this.getUser(user.user_id).pipe(
      map(snap => {
        return this.snapIntoUser(snap); 
      })
    )
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para crear un usuario nuevo con los datos proporcionados del user de Google.
   * @param user 
   */
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
