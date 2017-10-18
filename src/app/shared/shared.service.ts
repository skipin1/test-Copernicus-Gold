import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Rate } from '../exchange-rate/rate';
import { HistoryItem } from '../historyLog';
import { Task } from '../task/task';

@Injectable()
export class SharedService {
  private subjectPage = new Subject<Object>();
  private subjectRate = new Subject<Object>();
  private subjectHistoryLog = new Subject<HistoryItem[]>();
  private subjectTask = new Subject<Task[]>();
  private currentPage: string;
  private exchangeRate: Rate;
  private historyLog: Array<HistoryItem>;
  private tasks: Task[];

  constructor() { }

  changeCurrentPage(page: string): void {
    this.currentPage = page;
    this.subjectPage.next(this.currentPage);
  }

  getCurrentPage(): Observable<object> {
    return this.subjectPage.asObservable();
  }

  changeCurrentRate(exchangeRate: Rate): void {
    this.exchangeRate = exchangeRate;
    this.subjectRate.next(this.exchangeRate);
  }

  getCurrentRate(): Observable<object> {
    return this.subjectRate.asObservable();
  }

  changeHistoryLog(historyLog: HistoryItem[]): void {
    this.historyLog = historyLog;
    this.subjectHistoryLog.next(this.historyLog);
  }

  getHistoryLog(): Observable<HistoryItem[]> {
    return this.subjectHistoryLog.asObservable();
  }

  changeTask(tasks: Task[]): void {
    this.tasks = tasks;
    this.subjectTask.next(this.tasks);
  }

  getTasks(): Observable<Task[]> {
    return this.subjectTask.asObservable();
  }
}
