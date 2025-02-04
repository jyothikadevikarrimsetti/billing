import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ProductcatalogService } from '../service/productcatalog.service';
import { ProductdetailDTO } from '../models/ProductdetailDTO';
import { OrderModelDTO } from '../models/OrderModelReqDTO';
import { Form, NgForm } from '@angular/forms';
import { ProductsQuantity } from '../models/ProdQuantity';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

constructor(private orderService : OrderService , private productCatalogService : ProductcatalogService , private notificationService : NotificationService){}

ngOnInit(){
  
}

ids = [] as number[]

productsQuantity = [] as ProductsQuantity[]

order: OrderModelDTO = {
  id: undefined, // Default or placeholder value
  customer: {
    id: undefined,
    customerName: undefined,
    mobileNumber: '',
    email: undefined,
    ordersList: undefined
  },
  products: this.ids,
  status: ''
};

productList(){
  return this.productCatalogService.productsByIds(this.ids).subscribe({
    next:(response)=>{
      console.log(response)
        this.productsQuantity = response;
        console.log(this.productsQuantity)
    }
  }
)}

submit(checkoutForm : NgForm){
 const place = {
    "id"  : checkoutForm.value.id === ''? undefined :this.order.id,
    "customer" : {
      "id": checkoutForm.value.id === ''? undefined : this.order.customer.id,
      "customerName" : checkoutForm.value.name === ''? undefined : this.order.customer.customerName,
      "mobileNumber" : checkoutForm.value.mobileNumber ,
      "email" : checkoutForm.value.email === ''? undefined : this.order.customer.email
    },
    "products" : this.ids,
    "status" : checkoutForm.value.status
  }

  this.orderService.addOrder(place).subscribe({
    next:(response)=>{
      // console.log(response)
     
  this.order=  {
        id: undefined, // Default or placeholder value
        customer: {
          id: undefined,
          customerName: undefined,
          mobileNumber: '',
          email: undefined,
          ordersList: undefined
        },
        products:[],
        status: 'pending'
      };
      this.notificationService.show(response, "success")
    },
    error : (err)=>{
      console.log(err.message)
    }
  })
}

}
