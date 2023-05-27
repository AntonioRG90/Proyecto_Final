import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  showNotification(message:string, duration:number) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data:{
        message:message,
      },
      duration: duration,
      verticalPosition: 'top',
    });
  }
}
