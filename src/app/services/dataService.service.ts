import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharedServie {
  private searchString$ = new Subject<string>();

  sendText(message: string) {
    this.searchString$.next(message);
  }

  onTextString(): Observable<string> {
    return this.searchString$.asObservable();
  }
}
