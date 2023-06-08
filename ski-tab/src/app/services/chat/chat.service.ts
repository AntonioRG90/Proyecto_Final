import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/message';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private idGeneratorService: IdGeneratorService,
    private db: AngularFireDatabase,
  ) { }

  sendMessage(userId:string, userName:string, data:any){
    const id = Date.now();
    const path = 'messages/'+id;
    const messageToInsert:Message = {
      id: id,
      userId: userId,
      userName: userName,
      message: data.message,
    };
    this.db.object(path).set(messageToInsert)
    .catch(error => console.log(error));
  }

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

  deleteAllMessages(){
    const path = 'messages/';
    return this.db.object(path).remove();
  }
}
