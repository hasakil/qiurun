import { Directive, Input } from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmValidator(confirm: string): ValidatorFn {

  // 返回null表示通过了验证,用来验证两个change password的时候两次密码是否一样
  return (control: AbstractControl): ValidationErrors | null => {
    if ( !control.value ) {
      return {required: true };
    }
    return control.value !== confirm ? {confirm: {value: true}} : null;
  };
}
@Directive({
  selector: '[appConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmDirective,
      multi: true
    }
  ]
})
export class ConfirmDirective {

  @Input('appConfirm') confirmValue: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    // throw new error('method not implemented.')
    return this.confirmValue ? confirmValidator(this.confirmValue)(control) : null;
  }
}

