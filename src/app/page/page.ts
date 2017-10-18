import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/shared.service';

export class Page implements OnInit {

  protected page: string;
  constructor(
    protected route: ActivatedRoute,
    protected sharedService: SharedService,
    // private route: ActivatedRoute,
    // private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: object) => {
      // console.log('route`s params is', data);
      this.page = data['page'];
    });
    this.sharedService.changeCurrentPage(this.page);
  }

}
