import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FakestoreService } from '../services/fakestore.service';
import { DataSharedServie } from "../services/dataService.service";
import { FormControl } from '@angular/forms';
import { Product } from '../Shared/Models/product';
import { debounceTime, distinctUntilChanged, share, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterContentInit {
  public products: Observable<Product[]>;
  filter_option = new FormControl('all');
  noProductsFound: boolean = false;


  constructor(private fakeStore: FakestoreService,
    private datasharedService: DataSharedServie) {
      this.products = this.fakeStore.getProducts();
    }

  ngOnInit() {
   
    this.filter_option.valueChanges.subscribe(val=> { 
      if (val){      
         this.products = this.fakeStore.getfilteredProducts(val);
      }
    });

  }

  ngAfterContentInit(){
    this.datasharedService.onTextString().pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((text)=> this.fakeStore.searchProducts(text)),
    share()
   ).subscribe(products=> {

    this.noProductsFound = (products.length) ? false : true;
    this.products = of(products);
    
   })  
  }


}
