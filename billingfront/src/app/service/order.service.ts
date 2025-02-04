import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderDTO } from '../models/OrderDTO';
import { OrderModelDTO } from '../models/OrderModelReqDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http : HttpClient) { }

  _url ="http://localhost:8080/orders"

  allOrders(pgNo : number , pageSize : number) : Observable<OrderDTO[]>{
    const url = `${this._url}/all?pgNo=${pgNo}&pgSize=${pageSize}`
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
      headers = headers.set('Authorization','Bearer ${token}')
    }
    return this._http.get<OrderDTO[]>(url,{headers}).pipe(catchError(this.errorHandler ))
    

  }

  addOrder(order : OrderModelDTO) : Observable <string>{
    const url = `${this._url}/add`
    console.log(order)
    return this._http.post<string>(url,order,{responseType:"text" as "json"}).pipe(catchError(this.errorHandler))
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(()=>error.message || "server error")
  }

  search(term : string , pgNo : number , pgSize : number) : Observable <OrderDTO[]>{
    const url = `${this._url}/customerorders?pgNo=${pgNo}&pgSize=${pgSize}`
    
    return this._http.post<OrderDTO[]>(url,term).pipe(catchError(this.errorHandler))

  }


}
