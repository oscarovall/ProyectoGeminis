import { Pipe, PipeTransform } from '@angular/core';

//////////////////////////////////////////////////////////
// Truncate the title and put the ...
//////////////////////////////////////////////////////////
@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(val: string, args: number): string {
    if (args === undefined) {
      return val;
    }

    if (val.length > args) {
      return val.substring(0, args) + '...';
    } else {
      return val;
    }
  }

}
