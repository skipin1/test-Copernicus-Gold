import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-control-messages',
  template: `<div class="message" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
//   errorMessage: string;
  @Input() control: FormControl;
  constructor() {}

  get errorMessage(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
