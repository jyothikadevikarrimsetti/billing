import { Component } from '@angular/core';
import { InventoryService } from '../service/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryDTO } from '../models/InventoryDTO';
import { NgForm } from '@angular/forms';
import { ProductdetailDTO } from '../models/ProductdetailDTO';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-inventorydetail',
  templateUrl: './inventorydetail.component.html',
  styleUrl: './inventorydetail.component.scss'
})
export class InventorydetailComponent {

  ngOnInit(){
    this.inventory = {
      productId : {} as ProductdetailDTO
    } as InventoryDTO
  }

  constructor(private _inventoryService : InventoryService,private snackbar : NotificationService){}

  
  id : number | undefined;
inventory = {
  productId : {} as ProductdetailDTO
} as InventoryDTO

  getInventory(id : number|undefined){
if(id)
    this._inventoryService.getInventory(id).subscribe({
      next: (response)=>{
       
      },error : (err)=>{

      }
    })
  }

  onSubmit(form: any): void {
    if (form.valid) {
    const inventoryData = {
      
      ...form.value,
      inventoryId : this.inventory.inventoryId
    }
      console.log('Form Submitted:', this.inventory);
      this._inventoryService.setInventory(inventoryData).subscribe({
        next:(response)=>{
        this.snackbar.show(response,'success')  
        }
      })
    } else {
      console.error('Form is invalid!');
    }
  }

 

}



