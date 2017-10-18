import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Page } from '../../page/page';
import { Task } from '../task';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent extends Page implements OnInit {

  tasks: Task[];
  subscribeTasks: Subscription;

  constructor(
    protected route: ActivatedRoute,
    protected sharedService: SharedService,
  ) {
    super(route, sharedService);
    this.subscribeTasks = this.sharedService.getTasks().subscribe( tasks => {
      this.tasks = tasks;
      if (this.tasks.length > 0 ) { this.tasks.sort(this.sortingFunc); }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (this.tasks.length > 0 ) { this.tasks.sort(this.sortingFunc); }
  }

  brandTrackBy(index, item) {
    // return item.id;
    return index;
  }

  sortingFunc(a, b): number {
    // let sortValue = 0;
    // if (a.complete === b.complete ) { sortValue = 0; }
    // if (a.complete ) { sortValue = 1; }
    // if (!a.complete ) { sortValue = 1; }
    // return sortValue;
    return (a.complete === b.complete) ? 0 : a.complete ? 1 : -1;
    // a.complete === b.complete;
  }

}
