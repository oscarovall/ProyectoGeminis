import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'number-format',
  templateUrl: './number-format.component.html',
  styleUrls: ['./number-format.component.css']
})
export class NumberFormatComponent implements OnInit {
  @Input() value;
  @Input() disabled: boolean;
  @Input() format: string;
  @Input() Disabled: boolean;
  @Input() required: string;
  @Output() changeValue: EventEmitter<string>;
  insideVaule: any;
  type: string = 'text';
  constructor() {
    this.changeValue = new EventEmitter<string>();
  }

  ngOnInit() {
    if (this.value) {
      this.insideVaule = this.value;
      this.applyFormat();
    }
  }
  writing() {
    this.insideVaule = this.value;
    this.changeValue.emit(this.value);
  }
  removeFormat() {
    if (this.value) {
      this.value = parseFloat(this.value.replace(/[^0-9.]/gi, ''));
    }
    this.type = 'number';
  }
  applyFormat() {
    if (this.insideVaule) {
      switch (this.format) {
        case 'money-USD':
          this.type = 'text';
          this.value = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(this.insideVaule);
          break;
        case 'phoneNumber':
          this.type = 'text';
          const temp = []
          let temp2 = String(this.insideVaule);
          temp.push(temp2.match(/^.{0,3}/gi));
          temp2 = temp2.slice(temp[0][0].length);
          temp.push(temp2.match(/^.{0,3}/gi));
          temp2 = temp2.slice(temp[1][0].length);
          temp.push(temp2);
          this.value = temp[0] + '-' + temp[1] + '-' + temp[2]
          break;
        default:
          this.type = 'text';
          this.value = this.value;
      }
    }
  }
}
