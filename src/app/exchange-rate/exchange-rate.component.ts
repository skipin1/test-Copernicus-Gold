import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ExchangeRateService } from './exchange-rate.service';
import { Rate } from './rate';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../page/page';
import { HistoryItem } from '../historyLog';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.sass']
})
export class ExchangeRateComponent extends Page implements OnInit, OnDestroy {

  // private page: string;
  subscribeRate: Subscription;
  subscribeHistoryLog: Subscription;
  display: boolean;
  rate: number;
  sourceCode: string;
  targetCode: string;
  // history: Array<number>;
  // historyLimit = 3;
  historyLog: Array<HistoryItem>;

  constructor(
    protected route: ActivatedRoute,
    protected sharedService: SharedService,
    // private exchangeRateService: ExchangeRateService
  ) {
    super(route, sharedService);
    this.display = false;
    // Update current rate
    this.subscribeRate = this.sharedService.getCurrentRate()
      .subscribe((data: Rate) => {
        // console.log('Rate from component is ', data);
        this.updateRate(data);
    });

    // Update historuLog
    this.subscribeHistoryLog = this.sharedService.getHistoryLog()
    .subscribe(newHistory => {
      // console.log('Subscribe date from historyLog', newHistory);
      this.historyLog = newHistory;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.updateRate(JSON.parse(localStorage.getItem('rate')));
    this.historyLog = JSON.parse(localStorage.getItem('historyLog')) || [];
  }

  ngOnDestroy() {
    this.subscribeRate.unsubscribe();
    this.subscribeHistoryLog.unsubscribe();
  }

  updateRate(data: Rate): void {
    if (data) {
      this.rate = data.rate;
      this.sourceCode = data.source_code;
      this.targetCode = data.target_code;
      if (!this.display) {
        this.display = true;
      }
    }
  }

}
