import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductdetailDTO } from '../models/ProductdetailDTO';
import { CreateProductDTO } from '../models/productDTO';
import { InventoryDTO } from '../models/InventoryDTO';
import { ProductsQuantity } from '../models/ProdQuantity';

@Injectable({
  providedIn: 'root'
})
export class ProductcatalogService {

  constructor(private _http : HttpClient) { }
  _url = "http://localhost:8080/products"
  
  // uploadCSV(file : File ) : Observable<string>{

  //   const url = `${this._url}/upload`

  //   const formData = new FormData();
  //   formData.append('file',file,file.name)

  //   return this._http.post<string>(url,formData,{responseType:'text' as 'json'}).pipe(catchError(this.errorHandler))

  
  // }
  errorHandler(error : HttpErrorResponse){
    return throwError(()=>error.message||"server error")
  }

  allProducts(pgNo : number, pageSize: number) : Observable<ProductdetailDTO[]>{
   const url = `${this._url}/allproducts?pgNo=${pgNo}&pgSize=${pageSize}`
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
      headers = headers.set('Authorization','Bearer ${token}')
    }
   return this._http.get<ProductdetailDTO[]>(url,{headers}).pipe(catchError(this.errorHandler))
  }

createProduct(product : CreateProductDTO) : Observable<string> {

  const url = `${this._url}/create`

  return this._http.post<string>(url,product,{responseType:'text' as 'json'}).pipe(catchError(this.errorHandler))
  
}

updateProduct(product : CreateProductDTO) : Observable<string> {

  const url = `${this._url}/update`

  return this._http.put<string>(url,product,{responseType:'text' as 'json'}).pipe(catchError(this.errorHandler))
  
}

deleteProduct(id : number) : Observable<string>{

  const url = `${this._url}/delete/${id}`

  return this._http.delete<string>(url).pipe(catchError(this.errorHandler))
}

getProduct(id : number) : Observable<ProductdetailDTO>{

  const url = `${this._url}/allproducts/${id}`

  return this._http.get<ProductdetailDTO>(url).pipe(catchError(this.errorHandler))
}

getInventory(id : number): Observable<InventoryDTO[]>{

  const url = `${this._url}/prodinv?id=${id}`
 
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
    headers.set('Authorization',`Bearer ${token}`)
    }

  return this._http.get<InventoryDTO[]>(url, {headers}).pipe(catchError(this.errorHandler))
}

searchProduct(term : string , pgNo: number, pgSize : number) : Observable<ProductdetailDTO[]>{

 const url = `${this._url}/allproducts/search?pgNo=${pgNo}&pgSize=${pgSize}&term=${term}`

return this._http.get<ProductdetailDTO[]>(url).pipe(catchError(this.errorHandler))
}

productsByIds(ids : number[]) : Observable<ProductsQuantity[]>{
  const url = `${this._url}/allproducts/ids`
  return this._http.post<ProductsQuantity[]>(url,ids).pipe(catchError(this.errorHandler))
}

}
