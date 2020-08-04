import {
  Component,
  OnInit,
  forwardRef,
  HostBinding,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  IterableDiffers,
  DoCheck
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tc-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TCSliderComponent),
      multi: true
    }
  ]
})
export class TCSliderComponent
  implements OnInit, ControlValueAccessor, AfterViewInit, DoCheck {
  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    if (
      event.target === this.element.nativeElement.querySelector('.rail')
      || event.target === this.element.nativeElement.querySelector('.track')
      || event.target === this.element.nativeElement.querySelector('.dots')
    ) {
      let x: number;
      // if (this.direction == 'vertical') {
      x = event.clientY;
      // } else {
      //   x = event.clientX;
      // }
      this.moveHandler(x);
    }
  }

  @HostListener(':touchstart', ['$event'])
  public onTouch(event) {
    if (
      event.target === this.element.nativeElement.querySelector('.rail')
      || event.target === this.element.nativeElement.querySelector('.track')
      || event.target === this.element.nativeElement.querySelector('.dots')
    ) {
      let x;
      // if (this.direction == 'vertical') {
      x = event.touches[0].clientY;
      // } else {
      //   x = event.touches[0].clientX;
      // }
      this.moveHandler(x);
    }
  }
  @HostBinding('class.tc-slider') true;
  @HostBinding('class.tooltip') @Input() tooltip: boolean;
  @HostBinding('class.with-labels') get getLabels() { return this.labels.length !== 0};
  // @HostBinding('class.vertical') get getVerticalDirection() { return this.direction == 'vertical'; }
  @HostBinding('style.width') get getSliderWidth() { return this.width + 'px'};

  @Input('value') _value: number | number[];
  @Input() range: boolean;
  @Input() disabled: boolean;
  @Input() min: number;
  @Input() max: number;
  @Input() direction: string;
  @Input() step: number;
  @Input() dots: number[];
  @Input() labels: string[];
  @Input() accentColor: string;
  @Input() width: number;
  pointerDown: boolean;
  leftOffset: number;
  topOffset: number;
  elementWidth: number;
  elementHeight: number;
  lastValue: number | number[];
  differ: any;
  reserveValue: number[];

  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private _differ: IterableDiffers
  ) {
    this.differ = this._differ.find([]).create(null);
    this.range = false;
    this.step = 0;
    this.min = 0;
    this.max = 100;
    this.direction = 'horizontal';
    this.tooltip = false;
    this.dots = [];
    this.labels = [];
    this.accentColor = '#FF8534';

    if (!this._value) {
      let temp: number[] = Array(this.min, this.max);
      this.value = this.range ? temp : this.min;
    }
    this.pointerDown = false;
  }

  public get value() {
    return this._value;
  }

  public set value(innerValue: number | number[]) {
    let value: number | number[] = this.range
      ? [Number(innerValue[0]), Number(innerValue[1])]
      : Number(innerValue);
    if (this.range) {
      if (
        value[0] >= this.min &&
        value[0] <= this.max &&
        value[0] <= value[1] &&
        value[1] >= this.min &&
        value[1] <= this.max &&
        value[1] >= value[0]
      ) {
        this._value = value;
        this.lastValue = this._value;
      } else {
        if (value[0] < this.min || value[1] > this.max) {
          if (value[1] > this.max) {
            this._value[1] = this.max;
          } else if (value[0] < this.min) {
            this._value[0] = this.min;
          }
        }
        else if (value[0] > value[1] || value[1] < value[0]) {
          if (value[0] > value[1]) {
            this._value[0] = this._value[1];
          } else {
            this._value[1] = this._value[0];
          }
        }
      }
    } else {
      if (value >= this.min && value <= this.max) {
        this._value = value;
        this.lastValue = this._value;
      } else if (value > this.max) {
        this._value = this.max;
      } else if (value < this.min) {
        this._value = this.min;
      }
    }
    this.onChange(this._value);
    this.onTouched();
  }

  public getElementSize() {
    return this.element.nativeElement.clientHeight;
  }

  public getElementOffset() {
    return this.element.nativeElement.getBoundingClientRect().top;
  }

  public dotOffsetLeft(dot: number) {
    return 0;
  }

  public dotOffsetTop(dot: number) {
    return 0;
  }

  public getTrackHeight(): number {
    return this.toPercentage(this.value);
  }

  public getTrackOffset() {
    if (this.range) {
      return 0;
    } else {
      return 0;
    }
  }
  public getTrackTopOffset() {
    if (this.range) {
      return null;
    } else {
      return null;
    }
  }

  public getTrackWidth(): number {
    return this.toPercentage(this.value);
  }

  public moveHandler(x: number) {
    let value: number;
    let last: number;
    let mousePosition;
    this.leftOffset = this.element.nativeElement.getBoundingClientRect().left;
    this.elementWidth = this.element.nativeElement.offsetWidth;
    this.topOffset = this.element.nativeElement.getBoundingClientRect().top;
    this.elementHeight = this.element.nativeElement.clientHeight;
    this.changeDetector.detectChanges();

    mousePosition = ((x - this.topOffset) * 100) / this.elementHeight;

    if (this.range) {
      if (mousePosition < (this.lastValue[0] + this.lastValue[1]) / 2) {
        last = this._value[0];
      } else if (mousePosition > (this.lastValue[0] + this.lastValue[1]) / 2) {
        last = this._value[1];
      }
    } else {
      last = <number>this._value;
    }

    let lastValueOffset = (last * 100) / (this.max - this.min);
    let stepOffset = (this.step * 100) / (this.max - this.min);

    let newValue: number;
    if (this.step > 0) {
      if (Math.abs(mousePosition - lastValueOffset) >= stepOffset / 2) {

        if (mousePosition > lastValueOffset) {
          newValue = lastValueOffset + stepOffset;
          value = parseFloat(((newValue * (this.max - this.min)) / 100 + this.min).toFixed(0));
        } else if (mousePosition < lastValueOffset) {
          newValue = lastValueOffset - stepOffset;
          value = parseFloat(((newValue * (this.max - this.min)) / 100 + this.min).toFixed(0));
        }
      }
    } else if (mousePosition > -1 && mousePosition < 101) {
      value = parseFloat(((mousePosition * (this.max - this.min)) / 100 + this.min).toFixed(0));
    } else if (mousePosition > 100) {
      value = this.max;
    } else if (mousePosition < 0) {
      value = this.min;
    }
    this.labelClick(value);
  }

  labelClick(labelValue: number, e?: Event) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.range) {
      if (labelValue < (this.value[0] + this.value[1]) / 2) {
        this.value = [labelValue, this.value[1]];
      } else if (labelValue => (this.lastValue[0] + this.lastValue[1]) / 2) {
        this.value = [this.value[0], labelValue];
      }
    } else {
      this.value = labelValue;
    }
  }

  offsetTop(value: number): number {
    return this.toPercentage(value);
  }
  offsetLeft(value: number): number {
    return this.toPercentage(value);
  }

  writeValue(value: number | number[]): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled
      ? this.renderer.setAttribute(
        this.element.nativeElement.childNodes[0],
        'disabled',
        'true'
      )
      : this.renderer.removeAttribute(
        this.element.nativeElement.childNodes[0],
        'disabled'
      );
  }

  getDotStyle(dot: number) {
    if (this.range) {
      if (
        (this._value[1] >= dot && this.value[0] <= dot) ||
        (this.value[0] >= dot && this.value[1] <= dot)
      ) {
        return {
          background: this.accentColor,
          'border-color': this.accentColor
        };
      }
    } else {
      if (this._value >= dot) {
        return {
          background: this.accentColor,
          'border-color': this.accentColor
        };
      }
    }
  }

  getLabelStyle(dot: number) {
    if (this.range) {
      if (
        (this._value[1] >= dot && this.value[0] <= dot) ||
        (this.value[0] >= dot && this.value[1] <= dot)
      ) {
        return {
          opacity: 1
        };
      }
    } else {
      if (this._value >= dot) {
        return {
          opacity: 1
        };
      }
    }
  }

  toPercentage(value: number | number[]): number {
    if (Array.isArray(value)) {
      return (
        ((value[1] - this.min - (value[0] - this.min)) * 100) /
        (this.max - this.min)
      );
    } else {
      return ((<number>value - this.min) * 100) / (this.max - this.min);
    }
  }

  ngOnInit() {
    this.value = this._value;
  }

  ngDoCheck() {
    if (this.range) {
      let changes = this.differ.diff(this.value);
      if (changes) {
        this.value = this._value;
      }
    }
  }

  ngAfterViewInit() {
    this.leftOffset = this.element.nativeElement.getBoundingClientRect().left;
    this.elementWidth = this.element.nativeElement.offsetWidth;
    this.topOffset = this.element.nativeElement.getBoundingClientRect().top;
    this.elementHeight = this.element.nativeElement.clientHeight;
    this.dots.push(this.max);
    this.dots.unshift(this.min);
    this.changeDetector.detectChanges();
  }
}
