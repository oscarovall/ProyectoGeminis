import { Component, OnInit, AfterViewInit, HostBinding, Input, Output, HostListener, EventEmitter, ElementRef, forwardRef, ChangeDetectorRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tc-slider-handler',
  templateUrl: './slider-handler.component.html',
  styleUrls: ['./slider-handler.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TCSliderHandlerComponent),
      multi: true
    }
  ]
})
export class TCSliderHandlerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @HostListener('mousedown', ['$event'])
  public onPointerDown(event: MouseEvent) {
		this.pointerDown = true;
		this.lastValue = (this.value * 100 ) / (this.max - this.min);
		
	}
	@HostListener('document:mouseup', ['$event'])
	public onMouseUp() {
		this.pointerDown = false;
	}
  @HostListener('touchstart', ['$event'])
	public ontouchstart(event) {
		this.pointerDown = true;
		this.lastValue = (this.value * 100) / (this.max - this.min);	
		this.lastTouch = event;
  }
  
  @HostListener('document:touchend', ['$event'])
  public onTouchEnd(event) {
    this.pointerDown = false;
  }
  @HostListener('document:touchmove', ['$event'])
  public onTouchMove(event) {
    if (this.pointerDown) {
			let x;
      if (this.direction == 'vertical') {
				x = event.touches[0].clientY;
      } else {
				x = event.touches[0].clientX;
      }
			this.moveHandler(x);
    }
  }
  @HostListener('document:mousemove', ['$event'])
  public onPointerMove(event: MouseEvent) {
    if (this.pointerDown) {
      let x;
      if (this.direction == 'vertical') {
        x = event.clientY;
      } else {
        x = event.clientX;
      }
			this.moveHandler(x);
    }
  }

  @HostBinding('class.tc-slider-handler') true;
  @HostBinding('class.hovered')
  get getPointerState() {
    return this.pointerDown;
	}
  @Input('value') _value: number;
  @Input() direction: string;
  @Input() step: number;
  @Input() size: number;
  @Input() offset: number;
  @Input() max: number;
  @Input() min: number;
	@Input() enable: boolean;
	@Input() lesser: number;
	@Input() larger: number;
	@Input() color: string;
  pointerDown: boolean;
	last: number;
	lastValue: number;
	lastTouch: TouchEvent;
	@Output() valueChanged: EventEmitter<boolean>;

  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  constructor( private el: ElementRef, private changeDetecor: ChangeDetectorRef ) {
		this.valueChanged = new EventEmitter();
    this._value = 20;
    this.direction = 'horizontal';
		this.pointerDown = false;
		this.lastValue = ((this._value * 100) / (this.max - this.min));
	}
	
	public moveHandler(x: number) {		
		let lesserOffset = this.lesser 
		? parseFloat(((this.lesser - this.min) * 100 / (this.max - this.min)).toFixed(0)) 
		:	null;
		let largerrOffset = this.larger 
		? parseFloat(((this.larger - this.min) * 100 / (this.max - this.min)).toFixed(0)) 
		: null;
		let stepOffset = (this.step * 100) / (this.max - this.min);
		let mousePosition = (((x - this.offset) * 100) / this.size);
		let newValue: number;
		if (this.step > 0) {
      if (Math.abs(mousePosition - this.lastValue) >= stepOffset / 2) {
				if (this.lesser && mousePosition >	lesserOffset) {
					this.value = this.lesser;
				} else if (this.larger && mousePosition < this.larger) {
					this.value = this.larger;
				} else if (mousePosition > this.lastValue && mousePosition + stepOffset / 2 < 101) {
          newValue = this.lastValue + stepOffset;
          this.value = parseFloat(((newValue * (this.max - this.min)) / 100 + this.min).toFixed(0));
        } else if (mousePosition < this.lastValue && mousePosition - stepOffset / 2 > -1) {
          newValue = this.lastValue - stepOffset;
          this.value = parseFloat(((newValue * (this.max - this.min)) / 100 + this.min).toFixed(0));
        } else if (mousePosition > 100 || mousePosition + stepOffset / 2 > 101) {
          this.value = this.max;
        } else if (mousePosition < 0 || mousePosition + stepOffset / 2 < -1) {
          this.value = this.min;
				} 
      }
    } else if (mousePosition > 100) {
      this.value = this.max;
    } else if (mousePosition < 0) {
      this.value = this.min;
		} else if (this.lesser && mousePosition > lesserOffset) {
			this.value = this.lesser;
		} else if (this.larger && mousePosition < largerrOffset) {
      this.value = this.larger;
    } else if (mousePosition > -1 && mousePosition < 101) {
      this.value = parseFloat(((mousePosition * (this.max - this.min)) / 100 + this.min).toFixed(0));
    }
		this.last = (this.value * 100) / (this.max - this.min) + this.offset;
	}


  public get value() {
    return this._value;
  }

  public set value(value: number) {
    if (value <= this.max && value >= this.min) {
			this._value = value;
			this.last = this.value;
			this.lastValue = (this.value * 100) / (this.max - this.min);
    } else if (value > this.max) {
			this._value = this.max;
		} else if (value < this.min) {
			this._value = this.min;
		} 
		this.onChange(value);
		this.onTouched(value);
	}
	
  writeValue(value: number) {
    this.value = value;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  ngOnInit() {
		this.value = this._value;
	}

	ngAfterViewInit() {
		this.changeDetecor.detectChanges();
	}
}
