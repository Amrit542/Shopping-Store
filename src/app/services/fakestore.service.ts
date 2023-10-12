import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, ProductInCart } from '../Shared/Models/product';

@Injectable({
  providedIn: 'root',
})
export class FakestoreService {
  private cartItems: ProductInCart[] = [];
  cartSubject = new BehaviorSubject<ProductInCart[]>(this.cartItems);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  getfilteredProducts(name: string) {
    if (name == 'men') {
      return this.getProducts().pipe(
        map((products) => {
          return products.filter(
            (product) => product.category == "men's clothing"
          );
        })
      );
    } else if (name == 'women') {
      return this.getProducts().pipe(
        map((products) => {
          return products.filter(
            (product) => product.category == "women's clothing"
          );
        })
      );
    } else if (name == 'accessories') {
      return this.getProducts().pipe(
        map((products) => {
          return products.filter(
            (product) =>
              product.category != "women's clothing" &&
              product.category != "men's clothing"
          );
        })
      );
    } else {
      return this.getProducts();
    }
  }

  searchProducts(text: string) {
    return this.getProducts().pipe(
      map((products) => {
        console.log(text);
        
        const x = products.filter((prod) =>
          prod.title.toLowerCase().includes(text.toLowerCase())
        );
        console.log('from service api called after filtering');
        console.log(x);
        
        return x;
      })
    );
  }

  isInCart(product: Product): Boolean {
    return this.cartItems.some((cartItem) => cartItem.id == product.id);
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(
      (_item) => _item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const x: ProductInCart = { ...product, quantity: 1 };
      this.cartItems.push(x);
    }

    this.cartSubject.next(this.cartItems);
  }

  get cartLength() {
    return this.cartItems.length;
  }

  increaseQuantity(product: ProductInCart): void {
    this.addToCart(product);
  }

  decreaseQuantity(product: ProductInCart) {
    const index = this.cartItems.indexOf(product);
    this.cartItems[index].quantity--;

    this.cartSubject.next(this.cartItems);
  }

  getCart(): Product[] {
    return this.cartItems;
  }

  getCartItems(): Observable<ProductInCart[]> {
    return this.cartSubject.asObservable();
  }

  getItemById(id: number): boolean {
    return this.cartItems.find((x) => x.id == id) ? true : false;
  }

  deleteItem(item: ProductInCart) {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next(this.cartItems);
    }
  }

  deleteItemById(id: number) {
    const index = this.cartItems.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next(this.cartItems);
    }
  }

}
