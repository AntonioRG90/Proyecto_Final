import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  hide:boolean = false;

  constructor(
    public authService: AuthService,
    public generalService: GeneralService,
  ){}

  toggle(){
    this.hide = !this.hide;
    this.generalService.show(this.hide);
  }
}
