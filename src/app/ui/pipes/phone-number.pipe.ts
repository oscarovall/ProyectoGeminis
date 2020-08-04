import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(number: string): string {

    if(number) {
      const temp = []
      let temp2 = String(number);
      temp.push(temp2.match(/^.{0,3}/gi));
      temp2 = temp2.slice(temp[0][0].length);
      temp.push(temp2.match(/^.{0,3}/gi));
      temp2 = temp2.slice(temp[1][0].length);
      temp.push(temp2);
      const resp = temp[0] + '-' + temp[1] + '-' + temp[2];  
      return resp;

    } else {
      return number;
    }

  }

}
