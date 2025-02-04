import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProductcatalogComponent } from './productcatalog/productcatalog.component';
import { InventorydetailComponent } from './inventorydetail/inventorydetail.component';
import { InventorylistComponent } from './inventorylist/inventorylist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderlistComponent } from './orderlist/orderlist.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'registration',component : RegistrationComponent},
  {path:'login', component : LoginComponent},
  {path: 'product', component : ProductcatalogComponent},
  {path:'inventory', component : InventorydetailComponent},
  {path: 'inventorylist', component : InventorylistComponent},
  {path: 'dashboard',component : DashboardComponent},
  {path: 'orderlist',component : OrderlistComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
