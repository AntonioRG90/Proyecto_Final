import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   users: User[] = []; 

  constructor(
    private service:LoginService,
    private router:Router,
  ) {

  }

  ngOnInit() {
   this.service.getAllUsers().subscribe(users =>{
    this.users = users;
    console.log(this.users);
   })
  }

  
} 
