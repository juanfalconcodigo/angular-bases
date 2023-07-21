import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  show() {
    let me = this;
    me.showLoader.next(true);
  }

  hide() {
    let me = this;
    me.showLoader.next(false);
  }
}
