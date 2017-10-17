import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'required': 'Required',
            'minlength': `Минимальная длина ${validatorValue.requiredLength}`,
            'maxlength': `Максимальная длина ${validatorValue.requiredLength}`,
            'invalidInput': 'Only latin letters, comma, dash and asterisk'
        };

        return config[validatorName];
    }

    static inputValidator(control) {
        // console.log('validate service control ', control);
        if (control.value) {
            if (!control.value.match(/[^a-zA-Z\*\,\-]+/)) {
                return null;
            } else {
                return { 'invalidInput': true };
            }
        }
    }
}
