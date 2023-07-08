import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PageStateServiceService {
  getValueRole(nameLocal: string) {
    let dataString: any;
    dataString = localStorage.getItem(nameLocal);
    return JSON.parse(dataString);
  }
}
