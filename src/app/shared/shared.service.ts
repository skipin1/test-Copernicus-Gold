import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  private subject = new Subject<Object>();
  private currentPage: string;

  constructor() { }

  changeCurrentPage(page: string): void {
    this.currentPage = page;
    this.subject.next(this.currentPage);

  }

  getCurrentPage(): Observable<object> {
    return this.subject.asObservable();
  }
}
