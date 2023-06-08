import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private http: HttpClient,
  ) { }

  activationMail(userEmail:any) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*'
      })
    };
    userEmail = {'userMail': userEmail};
    return this.http.post('https://us-central1-skitab-57521.cloudfunctions.net/requestActivationMail', userEmail, httpOptions);
  }
}
