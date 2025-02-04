import { Component } from '@angular/core';
import { RegistrationDTO } from '../models/RegistrationDTO';
import { RegistrationService } from '../service/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registraion = {} as RegistrationDTO;
  confirmPassword = ""

  constructor(private _registrationService : RegistrationService,
     private snackbar : MatSnackBar,
     private router : Router
     ){}

  register(){
    // if(this.passwordsMatch){
    this._registrationService.registration(this.registraion).subscribe({
      next : (response)=>{
        console.log(response)
        this.showPopup(response,  'success')
        this.redirectToLogin();
      },error : (err)=>{
        // console.log(err)
        this.showPopup('Regsitration unsuccessful','error')
      }
    
     } )
  // }
}
  showPopup(message : string , type :'success'|'error'){
    this.snackbar.open(message, "Close",{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition : 'bottom',
      panelClass: type === 'success'? 'snackbar-success' : 'snackbar-error'
    })
  }

  get passwordsMatch(): boolean{
    return this.registraion.password === this.confirmPassword;
  }

  redirectToLogin(){
    this.router.navigate(['/login'])
  }



}
