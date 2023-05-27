import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
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

  changeStatus(userUid:any, userStatus:boolean){
    this.usersService.changeStatus(userUid, userStatus);
  }

  changeRole(userUid:any, userRole:boolean){
    this.usersService.changeRole(userUid, userRole);
  }

  removeUser(userUid:any){
    this.authService.gdelete(userUid);
    this.usersService.removeUser(userUid);
  }

}
