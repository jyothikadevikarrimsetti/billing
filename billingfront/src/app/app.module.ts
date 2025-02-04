import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './interceptor/auth.service';
import { ProductcatalogComponent } from './productcatalog/productcatalog.component';
import { JsonPipe } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { InventorylistComponent } from './inventorylist/inventorylist.component';
import { InventorydetailComponent } from './inventorydetail/inventorydetail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderlistComponent } from './orderlist/orderlist.component'

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProductcatalogComponent,
    ProductComponent,
    InventorylistComponent,
    InventorydetailComponent,
    DashboardComponent,
    OrderComponent,
    InvoiceComponent,
    OrderlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JsonPipe,
    MatPaginatorModule
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch()
    ),
    {provide: HTTP_INTERCEPTORS, useClass : AuthService , multi:true}
    ,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
