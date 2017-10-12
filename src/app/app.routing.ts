import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { AddTaskComponent } from './task/add-task/add-task.component';

const routes: Routes = [
  { path: '', redirectTo:             '/exchange-rate', pathMatch: 'full' },
  { path: 'add-task', component:      AddTaskComponent, data:      { page: 'add-task' } },
  { path: 'task-list', component:     TaskListComponent, data:     { page: 'task-list' } },
  { path: 'exchange-rate', component: ExchangeRateComponent, data: { page: 'exchange-rate' } },

  // // Always on bottom
  { path: '**', component: ExchangeRateComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
