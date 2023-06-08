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

  getUserData(userId:string){
    this.usersService.getUser(userId).subscribe( snap => {
      console.log('in');
      let userFromDB = this.usersService.snapIntoUser(snap);
      this.userRole = userFromDB.role;
    })
  }

  submitForm(){
    if(this.sendMessageForm.valid){
      this.chatService.sendMessage(this.userId, this.userName, this.sendMessageForm.value);
      this.sendMessageForm.reset();
    }
  }

  getAllMessages(){
    this.chatService.getAllMessages().subscribe( (messages) => {
      this.messages = messages;
    })
  }

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
