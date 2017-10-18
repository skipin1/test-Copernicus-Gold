import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeWhile';
import { SharedService } from './shared/shared.service';
import { Rate } from './exchange-rate/rate';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { HistoryItem } from './historyLog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Copernicus Gold';
  alive: boolean;  // use for unsubscribe
  interval: number;
  historyInterval: number;
  timer: Observable<number>;
  historyTimer: Observable<number>;
  history: Array<number>;
  historyLimit = 3;
  historyLog: HistoryItem[];
  private rate: number;

  constructor(
    private sharedService: SharedService,
    private exchangeRateService: ExchangeRateService
  ) {
    this.alive = true;
    this.interval = 10000;
    this.historyInterval = 15000;
    this.timer = Observable.timer(0, this.interval);
    this.historyTimer = Observable.timer(0, this.historyInterval);
  }

  ngOnInit() {
    this.history = [];
    this.historyLog =  JSON.parse(localStorage.getItem('historyLog')) || [];
    this.historyTimer
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.setHistory(this.rate).then(newHistoryLog => {
          // console.log('SetHistory resolve is ', newHistoryLog);
          localStorage.setItem('historyLog', JSON.stringify(newHistoryLog));
          this.sharedService.changeHistoryLog(newHistoryLog);
          if (newHistoryLog.length === 3) {
            this.checkDoneTask();
          }
        });
      });
    this.timer
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.exchangeRateService.getExchangeRate()
          .subscribe((data: Rate) => {
            // console.log('Rate from component is ', data);
            // Update rate in shared service
            this.rate = data.rate;
            localStorage.setItem('rate', JSON.stringify(data));
            this.sharedService.changeCurrentRate(data);
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  setHistory(rate: number): Promise<HistoryItem[]> {
    return new Promise((resolve, reject) => {
      // console.log('history', this.history);
      // console.log('rate', this.rate);
      if (rate) {
        this.history.unshift(rate);
        if (this.history.length > this.historyLimit) {
          this.history.pop();
        }
        // console.log('rate', this.rate);
        // Made historyLog item
        this.history.forEach((item, index) => {
          if (!this.historyLog[index]) {
            this.historyLog[index] = {};
          }
          this.historyLog[index].prev = this.historyLog[index].current;
          this.historyLog[index].current = item;
          this.historyLog[index].name = `${index + 1} ${index + 1 > 1 ? 'minutes' : 'minute'} ago`;
          // Compare prev and current value
          this.compare(this.historyLog[index]);
        });
        resolve(this.historyLog);
      }
    });
  }

  compare(item: HistoryItem) {
    if (!item.prev || !item.current) {
      return null;
    }
    if (item.current > item.prev) {
      item.action = 'up';
    }
    if (item.current < item.prev) {
      item.action = 'down';
    }
    if (item.current === item.prev) {
      item.action = 'neutral';
    }
  }

  checkDoneTask(): void {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length > 0) {
      tasks.forEach(task => {
        if (!task.complete) {
          this.historyLog.forEach((historyItem, index) => {
            if (task.time === index + 1) {
              if (task.exchangeRate === historyItem.action) {
                task.complete = true;
                // console.log('Change task status ', task.name);
              }
            }
          });
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.sharedService.changeTask(tasks);
    }
  }
}
