import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { HeaderComponent } from './header/header.component';
import { SharedService } from './shared/shared.service';
import { AppRoutingModule } from './app.routing';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    ExchangeRateComponent,
    TaskListComponent,
    TaskComponent,
    HeaderComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    SharedService,
    ExchangeRateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
