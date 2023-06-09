import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/message';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  /** 
  * @Author Antonio Ruiz Galvez
  * @description se comunica con la base de datos para introducir un mensaje nuevo.
  * @param userId
  * @param userName
  * @param userMail
  * @param data
  */
  sendMessage(userId:string, userName:string, userMail:string, data:any){
    const id = Date.now();
    const path = 'messages/'+id;
    const messageToInsert:Message = {
      id: id,
      userId: userId,
      userName: userName,
      userMail: userMail,
      message: data.message,
    };
    this.db.object(path).set(messageToInsert)
    .catch(error => console.log(error));
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para acceder a todos los mensajes almacenados
   * @returns todos los mensajes.
   */
  getAllMessages(){
    const path = 'messages/';
    return this.db.list(path, ref => {return ref.orderByChild('id')}).snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.val() as Message;
          return { ...data };
        })
      )
    )
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con la base de datos para eliminar todos los mensajes.
   * @returns la petición a la db
   */
  deleteAllMessages(){
    const path = 'messages/';
    return this.db.object(path).remove();
  }
}
