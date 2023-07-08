import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PageStateServiceService {
  private isExamPageSubject = new BehaviorSubject<boolean>(false);
  isExamPage$ = this.isExamPageSubject.asObservable();

  setIsExamPage(isExamPage: boolean) {
    this.isExamPageSubject.next(isExamPage);
  }
}
