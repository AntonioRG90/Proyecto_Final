import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  user:any = {};

  constructor(
    private usersService: UsersService,
  ){}

 ngOnInit(){
  this.usersService.tokenIntoUser().subscribe( user => {
    this.user = user;
  });
 }

}
