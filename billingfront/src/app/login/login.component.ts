import { Component } from '@angular/core';
import { LoginDTO } from '../models/LoginDTO';
import { RegistrationService } from '../service/registration.service';
import e, { response} from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
login = {} as LoginDTO 
msg = ""
constructor(private _registrationservice : RegistrationService, private snackbar : MatSnackBar, private router: Router ){}


userLogin(){

return this._registrationservice.login(this.login).subscribe({
  next : (response)=>{
   console.log(response.message)
  this.msg = response.message
  if(response.status === 'true'){
  localStorage.setItem('token', response.jwt)

  }

  this.router.navigate(['dashboard'])
  this.showPopup(this.msg , 'success')


  },
  error: (err)=>{
    console.log(err)
  
  }
})
}

showPopup(message : string , type :'success'|'error'){
  this.snackbar.open(message, "Close",{
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition : 'bottom',
    panelClass: type === 'success'? 'snackbar-success' : 'snackbar-error'
  })
}

toReg(){
  this.router.navigate(['registration'])
}

}
