import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Page } from '../../page/page';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent extends Page implements OnInit {

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
