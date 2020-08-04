import { Pipe, PipeTransform } from '@angular/core';


//////////////////////////////////////////////////////////
// Show the color for the days left for the dates on Lead Page
//////////////////////////////////////////////////////////
@Pipe({
  name: 'datecolorPipe'
})
export class DatecolorPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

      const intervals = {
        'day': 86400,
      };

      let counter;

      // tslint:disable-next-line: forin
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        counter = Math.abs(counter);
        if (counter < 16 ) {
          return 'defaultTagBig defaultTag p-0';
        } else if (counter < 30 ) {
          return 'defaultTagBig alertTag p-0';
        } else {
          return 'defaultTagBig warnignTag p-0';
        }
      }
    }
    return 'defaultTagBig defaultTag p-0';
  }

}
