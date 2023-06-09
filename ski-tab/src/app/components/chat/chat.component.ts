import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Message } from 'src/app/models/message';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { UsersService } from 'src/app/services/users/users.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  userToken = this.cookieService.get('accessToken');
  user = this.jwt.decodeToken(this.userToken);
  userId:string = this.user.user_id;
  userName:string = this.user.name;
  messages: Message [] = [];
  userRole: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private jwt: JwtHelperService,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private chatService: ChatService,
    private messengerService: MessengerService,
    private usersService: UsersService,
  ){}

  ngOnInit(){
    this.getUserData(this.userId);
    this.getAllMessages();
  }

  sendMessageForm = this.formBuilder.group({
    message: [""]
  })

  /**
   * @Author Antonio Ruiz Galvez
   * @description Se comunica con UsersService para traer el rol del usuario del parámetro
   * @param userId 
   */
  getUserData(userId:string){
    this.usersService.getUser(userId).subscribe( snap => {
      let userFromDB = this.usersService.snapIntoUser(snap);
      this.userRole = userFromDB.role;
    })
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description Si los datos son correctos se comunica con ChatService
   */
  submitForm(){
    if(this.sendMessageForm.valid){
      this.chatService.sendMessage(this.userId, this.userName, this.user.email, this.sendMessageForm.value); 
      this.sendMessageForm.reset();
    }
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con ChatService para traer todos los mensajes
   */
  getAllMessages(){
    this.chatService.getAllMessages().subscribe( (messages) => {
      this.messages = messages;
    })
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con ChatService para borrar todos los mensajes
   */
  deleteAllMessages(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: 'Clean up chat?'
      }
    })
    dialogRef.afterClosed().subscribe( check => {
      if(check) {
        this.chatService.deleteAllMessages();
        this.messengerService.showNotification("Chat cleaned up!", 2000);
      }    
    })
  }
}
