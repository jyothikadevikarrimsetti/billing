import { Component, ViewChild } from '@angular/core';
import { ProductcatalogComponent } from '../productcatalog/productcatalog.component';
import { InventorylistComponent } from '../inventorylist/inventorylist.component';
import { OrderlistComponent } from '../orderlist/orderlist.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
@ViewChild('productCatalog') product! : ProductcatalogComponent;
@ViewChild('inventoryList') inventory! : InventorylistComponent;
@ViewChild('orderList') orderList! : OrderlistComponent;

  selectedComponent = "product"

  term = ''

  

  search(){
    if(this.selectedComponent === "list" ){
      this.inventory.term = this.term
this.inventory.searchBySupAndLoc()
    }
    // this.product.term = this.term
    else if(this.selectedComponent === "product"){
      this.product.term = this.term
    this.product.search()
    }
    else if(this.selectedComponent === 'orderList'){
      this.orderList.term = this.term
      this.orderList.search()
    }
  }

}
