import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Product, ProductInCart } from '../../Shared/Models/product';
import { FakestoreService } from '../../services/fakestore.service';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.scss'],
})
export class SideCartComponent implements OnInit {
  public quantity: number = 1;

  @Input() public cartItem: ProductInCart;
  @Output() delete = new EventEmitter<ProductInCart>();
  public price: number;

  constructor(private fakeStore: FakestoreService) { }

  ngOnInit(): void {
    this.price = this.cartItem.price;
  }

  delete_item() {
    this.delete.emit(this.cartItem);
  }

  increaseQty(): void {
    this.fakeStore.increaseQuantity(this.cartItem);
  }
  decreaseQty() {
    if(this.cartItem.quantity > 1){
      
      this.fakeStore.decreaseQuantity(this.cartItem)
 
    }
 
  }
}
