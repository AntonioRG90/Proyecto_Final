import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router:Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {

  }

  loginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  submitForm(){
    if(this.loginForm.invalid){
      return;
    }
  
  }

  
} 
