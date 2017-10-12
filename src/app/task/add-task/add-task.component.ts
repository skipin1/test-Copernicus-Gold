import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {

  private page: string;

  constructor(
    private route: ActivatedRoute,
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
