import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import e from 'express';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler,

  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')

    if(token){
const clonedReq = req.clone({
  setHeaders : {
    Authorization : `Bearer ${token}`
  }
})
return next.handle(clonedReq).pipe(catchError((error : HttpErrorResponse)=>{
  if(error.status === 401){
    this.router.navigate(['/login'])
  }
  return throwError(()=>error)
}))
    }
    return next.handle(req).pipe(catchError((error : HttpErrorResponse)=>{

      if(error.status === 401){
        this.router.navigate(['/login'])
      }
      return throwError(()=>error)

    }))
  }

    constructor(private router : Router) { }
}
