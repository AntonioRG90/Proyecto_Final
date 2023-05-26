import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {
  constructor(
    private usersService: UsersService,
  ){}

  users: any[] = [];

  ngOnInit(){
    this.usersService.getUsers().subscribe( snap => {
      this.users = [];
      snap.forEach( u => {
        const user: any = u.payload.val();
        user.key = u.key;
        this.users.push(user);
        console.log(this.users);
      })
    })
  }

}
