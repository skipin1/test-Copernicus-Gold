import { Component, OnInit, Input } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
