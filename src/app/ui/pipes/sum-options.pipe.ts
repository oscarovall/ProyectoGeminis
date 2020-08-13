import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumOptions'
})
export class SumOptionsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
