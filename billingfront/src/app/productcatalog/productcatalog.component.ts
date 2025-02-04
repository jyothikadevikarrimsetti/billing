import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductcatalogService } from '../service/productcatalog.service';
import { ProductdetailDTO } from '../models/ProductdetailDTO';
import { reduce } from 'rxjs';
import { ProductComponent } from '../product/product.component';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventorylistComponent } from '../inventorylist/inventorylist.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { OrderDTO } from '../models/OrderDTO';
import { OrderService } from '../service/order.service';
import { OrderModelDTO } from '../models/OrderModelReqDTO';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-productcatalog',
  templateUrl: './productcatalog.component.html',
  styleUrl: './productcatalog.component.scss'
})
export class ProductcatalogComponent implements OnInit {


  @ViewChild('product') product! : ProductComponent;
  @ViewChild('invlist') inventoryList! : InventorylistComponent
  @ViewChild('addOrder') placeOrder! : OrderComponent

  ngOnInit(): void {
    this.getAllProducts()
   this.order.
    
      products =[] as number[]
    
    
  }


  selectedFile: File | null = null;

  constructor(private _productcatalogService : ProductcatalogService, private snackbar : MatSnackBar, private router : Router , private orderService : OrderService){}

 onFileSelected(event : Event) : void{
  const fileInput = event.target as HTMLInputElement;
  if(fileInput.files && fileInput.files.length>0){
    this.selectedFile = fileInput.files[0];


  }
 } 

//  uploadcsv() : void{
//   if(this.selectedFile !== null) {

//  this._productcatalogService.uploadCSV(this.selectedFile).subscribe({
//     next:(response)=>{

//     },error:(err)=>{

//     }
//   })
//  }
//  }

//  product ={
//   name: '',
//   category:'',
//   description:'',
//   price:null,
//   availableQuantity: null,
//   isActive: true
//  };

//  submitForm(){
//   console.log('Submitted Product:',this.product)
//  }

products = [] as ProductdetailDTO[]

getAllProducts(){
  return this._productcatalogService.allProducts(this.pageIndex, this.pageSize).subscribe({
    next: (response)=>{
     
      this.products = response
    },error: (err)=>{
      // console.log(err)
    }
  });
}

getProduct(id : number){
    this._productcatalogService.getProduct(id).subscribe({
      next: (response)=>{
        this.product.product = response
      },error : (err)=>{
        console.error(err)
      }
    })
}
deleteProduct(id : number){
  this._productcatalogService.deleteProduct(id).subscribe({
    next : (response)=>{
      this.showPopup(response,'success')
      this.getAllProducts()
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

getInventoryProd(id : number){
    this.router.navigate(['/inventorylist'], {queryParams : {productId : id}})
 
}

newProd(){
  this.product.product = {} as ProductdetailDTO
}

//pagination

 length = 100;
  pageEvent = 5;
  pageSize = 10;
  pageIndex = 0;

  pageChangeEvent(event : PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize =event.pageSize
    // this.getAllProducts()
    this.search()

  }
// search

term = ''

search(){

  return this._productcatalogService.searchProduct(this.term,this.pageIndex,this.pageSize).subscribe({
    next : (response)=>{
      this.products = response
    }
  })
}

//add order
order = {
  products : [] as number[]
} as OrderModelDTO

addToList(i:string, product : ProductdetailDTO){
  if (product.count === undefined || product.count === null) {
    product.count = 0; // Initialize count if undefined
  }
  if(i === "add"){
      product.count += 1
      if(product.productId !== undefined){

      this.order.products.push(product.productId)
      console.log(this.order.products)
      }
     
  }else if(i === "sub" ){
    if(product.count === 0){
      this.showPopup("invalid quantity","error")
    }
    else{
    product.count -= 1
    const index = this.order.products.indexOf(product.productId);
    if (index !== -1) {
      this.order.products.splice(index, 1); // Remove one instance at the found index
    }
    }
  }
}

addOrder(){
  return this.orderService.addOrder(this.order).subscribe({
    next : (response)=>{
        console.log(response)
    }
  })
}

sendIds() {
  this.placeOrder.ids = this.order.products
  this.placeOrder.productList()
  }



}
