import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationDTO } from '../models/RegistrationDTO';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginDTO } from '../models/LoginDTO';
import { LoginResponseDTO } from '../models/LoginResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http : HttpClient) { }
  _url = 'http://localhost:8080/auth'

  registration(register : RegistrationDTO) : Observable<string>{
    const url = `${this._url}/registration`
    return this._http.post<string>(url,register,{responseType: 'text' as 'json'}).pipe(catchError(this.errorHandler))
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(()=>error.message|| "Server Error")
  }

  login(log : LoginDTO) : Observable<LoginResponseDTO>{
    console.log(log)
    const url = `${this._url}/login`
    return this._http.post<LoginResponseDTO>(url,log).pipe(catchError(this.errorHandler))
  }

}
