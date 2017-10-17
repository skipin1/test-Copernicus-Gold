import { ValidationService } from './../../shared/validation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Page } from '../../page/page';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task } from '../task';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent extends Page implements OnInit {

  taskForm: FormGroup;

  constructor(
    protected route: ActivatedRoute,
    protected sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {
    super(route, sharedService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.createForm();
  }
  createForm() {
    this.taskForm = this.formBuilder.group({
      'name': [null, [
        Validators.required,
        // Validators.minLength(4),
        ValidationService.inputValidator]],
      'description': [null, []],
      'time': [1, [Validators.required]],
      'exchangeRate': ['up', [Validators.required]]
    });
  }

  addTask(form: Task, valid: boolean): void {
    if (valid) {
      console.log('add form is ', form);
      let tasks: Task[];
      tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(form);
      console.log('Our tasks is ', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.formReset();
    }
  }

  formReset(): void {
    this.createForm();
  }

}
