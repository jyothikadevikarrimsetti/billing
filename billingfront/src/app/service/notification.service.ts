import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar :MatSnackBar) { }

  show(message: string, type:'success' | 'error'){
    this.snackbar.open(message, 'Close',{
      duration :3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbae-error',
    });
  }
}
