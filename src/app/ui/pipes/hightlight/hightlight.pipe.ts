import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'tcHightlight'
})
export class HightlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, args?: any): any {
    if (!args) {
      return value;
    }

    let re = new RegExp(args.toString(), 'i');
    let match = re.exec(value.toString().trim());

    if (!match) {
      return value;
    }

    const newValue = value.toString().replace(re, '<span style="color: #e24d4d">' + match[0].toString().toLowerCase() + '</span>');
    return this.sanitizer.bypassSecurityTrustHtml(newValue);
  }
}
