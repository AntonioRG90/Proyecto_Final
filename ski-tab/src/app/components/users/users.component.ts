import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private dialog: MatDialog,
    private messengerService: MessengerService,
  ){}

  users: any[] = [];

  ngOnInit(){
    this.usersService.getUsers().subscribe( snap => {
      this.users = [];
      snap.forEach( u => {
        const user: any = u.payload.val();
        user.key = u.key;
        this.users.push(user);
      })
    })
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con UsersService para cambiar el status de un usuario.
   */
  changeStatus(userUid:any, userStatus:boolean){
    this.usersService.changeStatus(userUid, userStatus);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se comunica con UsersService para cambiar el rol de un usuario.
   * @param userUid 
   * @param userRole 
   */
  changeRole(userUid:any, userRole:boolean){
    this.usersService.changeRole(userUid, userRole);
  }

  /**
   * @Author Antonio Ruiz Galvez
   * @description se abre una ventana moda, si devuelve true, se comunica con UsersService y AuthService para eliminar el 
   *              usuario cuyos datos son pasados por paráemtro.
   * @param userUid 
   * @param userEmail 
   */
  removeUser(userUid:any, userEmail:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: 'Delete user?'
      }
    })
    dialogRef.afterClosed().subscribe( check => {
      if(check) {
        userEmail = {'userEmail': userEmail};
        this.authService.gdelete(userEmail).subscribe();
        this.usersService.removeUser(userUid);
        this.messengerService.showNotification("User deleted!", 2000);
      }    
    })

  }

}
