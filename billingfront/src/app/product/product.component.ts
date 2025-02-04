import { Component } from '@angular/core';
import { ProductdetailDTO } from '../models/ProductdetailDTO';
import { ProductcatalogService } from '../service/productcatalog.service';
import { CreateProductDTO } from '../models/productDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  product = {} as ProductdetailDTO;
  constructor(private _productCatalogService : ProductcatalogService, private snackbar : NotificationService){}

  createOrUpdate(){
    if(this.product.productId === null){
     return  this.createProd()
    }
return this.updateProd()
  }

  createProd(){
   const payload = {
    name : this.product.name,
    category : this.product.category,
    description : this.product.description
   } as CreateProductDTO
   return this._productCatalogService.createProduct(payload).subscribe({
    next:(response)=>{
      this.snackbar.show(response,"success")

    },error : (err)=>{

    }
   })
  }

  updateProd(){
    const payload = {
      id : this.product.productId,
      name : this.product.name,
      category : this.product.category,
      description : this.product.description
    } as CreateProductDTO
    return this._productCatalogService.updateProduct(payload).subscribe({
      next: (response)=>{
        this.snackbar.show(response,'success')
      },error: (err)=>{
        
      }
    })
  }

  // showPopup(message : string , type :'success'|'error'){
  //   this.snackbar.open(message, "Close",{
  //     duration: 3000,
  //     horizontalPosition: 'right',
  //     verticalPosition : 'bottom',
  //     panelClass: type === 'success'? 'snackbar-success' : 'snackbar-error'
  //   })
  // }



}
