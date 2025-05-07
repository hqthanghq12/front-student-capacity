import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // Return if no value is present
        }

        const emailDomain = control.value.split('@')[1];
        if (allowedDomains.includes(emailDomain)) {
            return null; // No error
        } else {
            return { 'emailDomain': true }; // Return error object if domain is not allowed
        }
    };
}