import { Component } from '@angular/core';
import { OrderService } from '../service/order.service';
import { OrderDTO } from '../models/OrderDTO';
import { PageEvent } from '@angular/material/paginator';
import { response } from 'express';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.scss'
})
export class OrderlistComponent {
  length = 100;
  pageEvent = 5;
  pageSize = 10;
  pageIndex = 0;

  pageChangeEvent(event : PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize =event.pageSize
    this.getOrders()
    this.search()

  }
constructor(private orderService : OrderService){}

orderList = [] as OrderDTO[]

ngOnInit(){
    this.getOrders()
}

getOrders(){
  this.orderService.allOrders(this.pageIndex,this.pageSize).subscribe({
    next : (response)=>{
      this.orderList = response
    }
  })
}

term = ""

search(){
return this.orderService.search(this.term , this.pageIndex,this.pageSize).subscribe({
  next : (response) => {
    this.orderList = response
  }
})
}




}
