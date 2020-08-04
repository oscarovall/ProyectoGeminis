import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnInit {

  @Input() Disabled: boolean;
  @Input() value: string;
  @Input() required: boolean;
  @Output() Change = new EventEmitter<string>();

  insideValue: string;
  insideArray: string[] = ['', ''];
  formatedInside: string;

  constructor() { }

  ngOnInit() {
    this.insideArray = this.value.split('-');
    this.aplyValue();
    this.formatInside();
  }

  OnChangeInside(value: any, pos: number) {
    this.insideArray[pos] = value;
    this.aplyValue();
    this.formatInside();
    console.log(this.insideArray);
    if(this.insideArray[0] && this.insideArray[1]){
      this.Change.emit(this.insideValue);
    }
  }
  aplyValue() {
    this.insideValue = this.insideArray[0] + '-' + this.insideArray[1];
  }
  formatInside() {
    let min = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseInt(this.insideArray[0], 10));
    let max = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseInt(this.insideArray[1], 10));
    this.formatedInside = min + ' - ' + max;
  }

}
