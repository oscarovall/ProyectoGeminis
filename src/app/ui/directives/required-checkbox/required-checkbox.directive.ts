import { Directive, OnChanges, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[checkboxValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RequiredCheckboxDirective,
    multi: true
  }],

})
export class RequiredCheckboxDirective implements Validator {
  @Input() required: boolean | string;
  private _onChange: () => void;

  constructor() { }

  validate(c: FormControl): { [key: string]: any; } {
    throw new Error('Method not implemented.');
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }



}
