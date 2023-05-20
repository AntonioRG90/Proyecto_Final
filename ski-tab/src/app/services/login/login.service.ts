import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { server } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http:HttpClient) {

   }

   getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(server.url+'user/');
  }
}
