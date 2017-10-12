import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private date: Date;
  private currentPage: string;
  private prevPage: string;
  private nextPage: string;
  private subscribeCurrentPage: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.subscribeCurrentPage = sharedService.getCurrentPage().subscribe((page: object) => {
      this.currentPage = page.toString();
      this.setLinks(this.currentPage);
    });
  }

  ngOnInit() {
    this.date = new Date();
  }

  ngOnDestroy() {
    this.subscribeCurrentPage.unsubscribe();
  }

  setLinks(currentPage: string): void {
    switch (currentPage) {
      case 'exchange-rate':
        this.nextPage = 'add-task';
        break;
      case 'add-task':
        this.prevPage = 'exchange-rate';
        this.nextPage = 'task-list';
        break;
      case 'task-list':
        this.prevPage = 'add-task';
        break;

    }
  }

  // Navitagion button
  goToPrev(): void {
    this.router.navigate(['/', this.prevPage.toLowerCase()]);
  }
  goToNext(): void {
    this.router.navigate(['/', this.nextPage.toLowerCase()]);
  }

}
