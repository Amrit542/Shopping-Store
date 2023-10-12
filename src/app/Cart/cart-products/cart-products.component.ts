import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ProductInCart } from '../../Shared/Models/product';
import { Observable } from 'rxjs';

import { FakestoreService } from '../../services/fakestore.service';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
})
export class CartProductsComponent implements OnInit, OnChanges {
  public itemsInCart: ProductInCart[];
  public subtotal: Observable<number> | undefined;
  total: number = 0;
  numOfItems = 0;

  @ViewChild('sideCart') sideCart: ElementRef;

  constructor(private fakeStore: FakestoreService) {}

  ngOnInit(): void {
    this.fakeStore.getCartItems().subscribe((items) => {
      this.itemsInCart = items;
      this.numOfItems = this.getTotalNumOfItems();
      this.total = this.calculateTotal();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.total = this.calculateTotal();
  }

  getTotalNumOfItems(): number {
    return this.itemsInCart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  private calculateTotal(): number {
    const totalValue = this.itemsInCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    return +Number(totalValue).toFixed(2);
  }

  close_sidebar() {
    this.sideCart.nativeElement.classList.toggle('open');
  }

  deleteItem(item: ProductInCart) {
    this.fakeStore.deleteItem(item);
  }

  checkout() {
    alert('This Functionality is under process. Sorry for Inconvenience.');
  }
}
