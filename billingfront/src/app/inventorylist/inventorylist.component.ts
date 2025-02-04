import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../service/inventory.service';
import { InventoryDTO } from '../models/InventoryDTO';
import { PageEvent } from '@angular/material/paginator';
import { InventorydetailComponent } from '../inventorydetail/inventorydetail.component';
import { ProductcatalogService } from '../service/productcatalog.service';
import { ActivatedRoute } from '@angular/router';
import { ProductdetailDTO } from '../models/ProductdetailDTO';

@Component({
  selector: 'app-inventorylist',
  templateUrl: './inventorylist.component.html',
  styleUrl: './inventorylist.component.scss'
})
export class InventorylistComponent implements OnInit {

  @ViewChild('inventorydetails') inventory! : InventorydetailComponent

  @Input() productId : number | null = null;

 
  setInventory(item: InventoryDTO | null) {
    if(item){
    this.inventory.inventory = item;
    }else{
     this.inventory.inventory = {} as InventoryDTO
      if(this.productId)
      this.inventory.inventory.productId.productId = this.productId 
    }

  }
  
  clearInv(){
this.inventory.inventory = {
  productId : {} as ProductdetailDTO
} as InventoryDTO
if(this.productId)
  this.inventory.inventory.productId.productId = this.productId
  }
  

  ngOnInit() : void{
    // this.getAllInventory()
    this.route.queryParams.subscribe((params)=>{
      this.productId = params['productId'] ? + params['productId'] : null ;
  
    if(this.productId){
      this.fetchAllInventory(this.productId)
    }else{
      this.getAllInventory()
    }
  });
  }

  fetchAllInventory(productId: number){
   
    this._productService.getInventory(productId).subscribe({next: (response)=>{
      this.inventoryList = response
    }})
  }

  constructor(private _inventoryService : InventoryService , private _productService : ProductcatalogService, private route : ActivatedRoute){}

  inventoryList = [] as InventoryDTO[]
  
  length = 100;
  pageEvent = 5;
  pageSize = 10;
  pageIndex = 0;

  pageChangeEvent(event : PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize =event.pageSize
    
    // this.getAllInventory()
    console.log(this.term)
    this.searchBySupAndLoc()

  }


  getAllInventory(){
    return this._inventoryService.getAllInvnetory(this.pageIndex,this.pageSize).subscribe({
      next:(response)=>{
        this.inventoryList = response
      },error:(err)=>{
        console.log(err)
      }
    })
  }
 // search
 term = ''
 searchBySupAndLoc(){
   return this._inventoryService.searchInvBySupAndLoc(this.term,this.pageIndex,this.pageSize).subscribe({
    next:(response)=>{
      this.inventoryList = response
    }
   })
 }



}
