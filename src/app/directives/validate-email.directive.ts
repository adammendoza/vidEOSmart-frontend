import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[vsValidateEmail][formControlName],[vsValidateEmail][formControl],[vsValidateEmail][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEmailDirective), multi: true }]
})
export class ValidateEmailDirective implements Validator {
  constructor(@Attribute('vsValidateEmail') public ncValidateEmail: string) {}

  validate(c: AbstractControl): { [key: string]: any } {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return EMAIL_REGEXP.test(c.value)
      ? null
      : {
          validateEmail: {
            valid: false
          }
        };
  }
}
