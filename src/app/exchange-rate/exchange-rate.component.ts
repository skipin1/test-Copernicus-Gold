import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ExchangeRateService } from './exchange-rate.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeWhile';
import { Rate } from './rate';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../page/page';

interface HistoryItem {
  action?: string;
  current?: number;
  name?: string;
  prev?: number;
}

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.sass']
})
export class ExchangeRateComponent extends Page implements OnInit, OnDestroy {

  // private page: string;
  subscribeRate: Subscription;
  interval: number;
  display: boolean;
  alive: boolean;  // use for unsubscribe
  timer: Observable<number>;
  rate: number;
  sourceCode: string;
  targetCode: string;
  history: Array<number>;
  historyInterval: number;
  historyLimit = 3;
  historyLog: Array<HistoryItem>;
  historyTimer: Observable<number>;

  constructor(
    protected route: ActivatedRoute,
    protected sharedService: SharedService,
    private exchangeRateService: ExchangeRateService
  ) {
    super(route, sharedService);
    this.display = false;
    this.alive = true;
    this.interval = 10000;
    this.historyInterval = 15000;
    this.timer = Observable.timer(0, this.interval);
    this.historyTimer = Observable.timer(0, this.historyInterval);
   }

  ngOnInit() {
    super.ngOnInit();
    this.history = [];
    this.historyLog = [];
    this.historyTimer.takeWhile(() => this.alive).subscribe(() => this.setHistory(this.rate));
    this.timer
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.exchangeRateService.getExchangeRate()
          .subscribe((data: Rate) => {
            // console.log('Rate from component is ', data);
            this.rate = data.rate;
            this.sourceCode = data.source_code;
            this.targetCode = data.target_code;
            if (!this.display) {
              this.display = true;
            }
        });
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  setHistory(rate: number): void {
    console.log('history', this.history);
    if (rate) {
      this.history.unshift(rate);
      if (this.history.length > this.historyLimit) {
        this.history.pop();
      }

      // Made historyLog item
      this.history.forEach((item, index) => {
        if (!this.historyLog[index]) {
          this.historyLog[index] = {};
        }
        this.historyLog[index].prev = this.historyLog[index].current;
        this.historyLog[index].current = item;
        this.historyLog[index].name = `${index + 1} ${index + 1 > 1 ? 'minutes' : 'minute'} ago`;
      });

      // Compare prev and current value
      this.historyLog.forEach((item: HistoryItem) => {
        this.compare(item);
      });
    }
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

}
