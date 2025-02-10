import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { InventoryDTO } from '../models/InventoryDTO';
import { error } from 'console';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


   API_URL = environment.apiUrl
  constructor(private _http : HttpClient) { }
   _url = `${this.API_URL}/products/inventory`

  errorHandler(error : HttpErrorResponse){
    return throwError(()=>error.message||"server error")
  }

   getInventory(id : number ): Observable<InventoryDTO>{
    const url = `${this._url}/getinventory?id=${id}`
    return this._http.get<InventoryDTO>(url).pipe(catchError(this.errorHandler))
   }

   setInventory(inventory : InventoryDTO) :Observable<string>{
// if(inventory.productId.productId != undefined){
    const url = `${this._url}/set`
// }
    console.log(inventory)
    return this._http.post<string>(url,inventory,{responseType: 'text' as 'json'}).pipe(catchError(this.errorHandler))
   }

   getAllInvnetory(pgNo : number , pgSize : number) :Observable<InventoryDTO[]>{
    const url = `${this._url}/all?pgNo=${pgNo}&pgSize=${pgSize}`
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
    headers.set('Authorization',`Bearer ${token}`)
    }
    return this._http.get<InventoryDTO[]>(url,{headers}).pipe(catchError(this.errorHandler))
  

   }
   searchInvBySupAndLoc(term : string, pgNo : number, pgSize : number): Observable<InventoryDTO[]>{
   const url = `${this._url}/all/search?pgNo=${pgNo}&pgSize=${pgSize}&term=${term}`

   return this._http.get<InventoryDTO[]>(url).pipe(catchError(this.errorHandler))

   }
}
