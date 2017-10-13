import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Page } from '../../page/page';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent extends Page implements OnInit {

  constructor(
    protected route: ActivatedRoute,
    protected sharedService: SharedService,
  ) {
    super(route, sharedService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
