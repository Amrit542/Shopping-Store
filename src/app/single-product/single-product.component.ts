import { Component, Input} from '@angular/core';
import { Product} from "../Shared/Models/product";
import { FakestoreService } from "../services/fakestore.service";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent{

  @Input() public product: Product;
  buttonText: string = 'ADD';
  isInCart: boolean = false;

  constructor(private fakeStore: FakestoreService) {}

   buttonTextFromCart$(): void {
      this.isInCart = this.fakeStore.getItemById(this.product.id);
      console.log(this.isInCart);
      this.buttonText = (this.isInCart) ? "Remove": "Add";
      
   }

  toggle_add_btn(isincart:boolean){
    if (isincart){
      this.fakeStore.deleteItemById(this.product.id);
    } else {
      this.fakeStore.addToCart(this.product); 
    }

    this.fakeStore.getCartItems().subscribe(e=> {
      const exist = this.fakeStore.isInCart(this.product);
      if (exist){
        this.isInCart = true
      } else{
        this.isInCart = false
      }
    });

  } 

}
