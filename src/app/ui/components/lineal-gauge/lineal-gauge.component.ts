import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

enum state_options {
  VERY_POOR,
  POOR,
  FAIR,
  GOOD,
  EXCELENT,
  NONE
}

@Component({
  selector: 'lineal-gauge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lineal-gauge.component.html',
  styleUrls: ['./lineal-gauge.component.css']
})
export class LinealGaugeComponent implements OnInit {

  @Output() change: EventEmitter<number> = new EventEmitter();

  @Input("value") result;
  @Input() Title;
  @Input() disabled: boolean;
  @Input() required: string;
  options = [
    {
      name: 'Very Poor',
      option_class: 'col veryPoor',
      boxShadow: '0 -5px 0 #c1191a',
      color: 'white'
    },
    {
      name: 'Poor',
      option_class: 'col poor',
      boxShadow: '0 -5px 0 #de7a17',
      color: 'white'
    },
    {
      name: 'Fair',
      option_class: 'col fair',
      boxShadow: '0 -5px 0 #e1a10d',
      color: 'white'
    },
    {
      name: 'Good',
      option_class: 'col good',
      boxShadow: '0 -5px 0 #ffbc20',
      color: 'white'
    },
    {
      name: 'Excellent',
      option_class: 'col excelent',
      boxShadow: '0 -5px 0 #39ae39',
      color: 'white'
    }
    // ,
    // {
    //   name: 'None',
    //   option_class: 'col',
    //   boxShadow: '0 -5px 0 trasparent',
    //   color: 'white'
    // }
  ];
  state = null;
  constructor() { }

  ngOnInit() {
    this.state = this.setState();
  }

  ngOnChanges() {
    this.state = this.setState();
  }

  setState() {
    if (this.result) {
      if (this.result >= 750) {
        return this.options[state_options.EXCELENT];
      }
      if (this.result >= 700 && this.result < 750) {
        return this.options[state_options.GOOD];
      }
      if (this.result >= 650 && this.result < 700) {
        return this.options[state_options.FAIR];
      }
      if (this.result >= 550 && this.result < 650) {
        return this.options[state_options.POOR];
      }
      if (this.result < 550) {
        return this.options[state_options.VERY_POOR];
      }
    } else {
      return this.options[state_options.NONE];
    }
  }
  editState(name: any) {
    if (!this.disabled) {
      if (name.includes('excelent')) {
        this.result = 750;
      }
      if (name.includes('good')) {
        this.result = 700;
      }
      if (name.includes('fair')) {
        this.result = 650;
      }
      if (name.includes('poor')) {
        this.result = 550;
      }
      if (name.includes('veryPoor')) {
        this.result = 500;
      }
      this.state = this.setState();
    }
//    console.log('result', this.result);

    this.change.emit(this.result);
  }
}
