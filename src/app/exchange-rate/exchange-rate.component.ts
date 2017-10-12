import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.sass']
})
export class ExchangeRateComponent implements OnInit {

  private page: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: object) => {
      console.log('route`s params is', data);
      this.page = data['page'];
    });
    this.sharedService.changeCurrentPage(this.page);
  }

}
