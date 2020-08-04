import { Pipe, PipeTransform } from '@angular/core';
import { Class } from '../../models/Class';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'classcolPipe'
})
export class ClasscolPipePipe implements PipeTransform {

  transform(value: Class[], side: boolean): Class[] {

    value = value.filter(el => el.side === side);
    return value;
  }

}
