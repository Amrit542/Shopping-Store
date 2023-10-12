import { Component, Output, EventEmitter  } from '@angular/core';

import { FakestoreService } from "../services/fakestore.service";
import { DataSharedServie } from "../services/dataService.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  searchString: string = '';
  @Output() someEvent = new EventEmitter();

  constructor(private fakeStore: FakestoreService, 
              private datasharedService: DataSharedServie) {}

  open_cart(){
    this.someEvent.emit('');
  }

  get itemInCart(){
    return this.fakeStore.cartLength;
  }

  search(){
    if (this.searchString != undefined){
      this.datasharedService.sendText(this.searchString);

    }
    
  }

}
