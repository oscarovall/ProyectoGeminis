import { Component, OnInit, HostBinding, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tc-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TCRatingComponent),
      multi: true
    }
  ]
})
export class TCRatingComponent implements OnInit, ControlValueAccessor {
  @HostBinding('class.tc-rating')	true;

  @Input() iconsNumber: number;
  @Input() iconView: string;
  @Input() hover: boolean;
  @Input() color: string | string[];
  @Input() default: number;
  icons: number[];
  hoverValue: number;
  _value: number;

  private onChange: any = (value: number) => { };
  private onTouched: any = () => { };

  constructor() {
    this.hover = false;
    this.color = ['#c1c1c1', '#ffeb3d', '#faa110'];
    this.default = 0;
    this.iconsNumber = 5;
    this.iconView = 'icofont-star';
  }

  ngOnInit() {
    this.icons = Array.from(new Array(this.iconsNumber), (val, index) => index + 1);
    this.value = this.default <= this.iconsNumber ? this.default : 0;
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut() {
    this.hoverValue = 0;
  }

  set value(value: number) {
    if (value >= 0 && value <= this.iconsNumber && value !== this._value) {
      this._value = value;
      this.writeValue(value);
      this.onChange(value);
    }
  }

  get value() {
    let value = (this._value * 100) / this.iconsNumber;
    return value;
  }

  setHoverValue(icon: number) {
    this.hoverValue = icon;
    if (this.hover) {
      this.value = icon;
    }
  }

  setValue(icon: number) {
    if (!this.hover) {
      this.value = icon;
    }
  }

  getIconStyles(icon: number) {
    if (this.hoverValue >= icon) {
      return {
        'color': this.color[1]
      };
    } else if (this._value >= icon) {
      return {
        'color': this.color[2]
      };
    } else {
      return {
        'color': this.color[0]
      };
    }
  }

  writeValue(value: number): void {
    this._value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}