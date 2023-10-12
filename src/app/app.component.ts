import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {  SideCartComponent} from "./Cart/side-cart/side-cart.component";
import { CartProductsComponent } from "./Cart/cart-products/cart-products.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Shop Mart';

    @ViewChild(CartProductsComponent) side_cart_comp: CartProductsComponent;
    


    open_cart1(e: any){

       this.side_cart_comp.sideCart.nativeElement.classList.toggle('open');
      //  this.side_cart_comp.sideCart.nativeElement.classList.add('open');
   
    }

    
}
