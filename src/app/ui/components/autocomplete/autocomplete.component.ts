import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef, ChangeDetectorRef, HostListener, AfterViewInit, OnChanges } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TCInputComponent } from '../input';

@Component({
  selector: 'tc-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: [
    '../input/input.component.scss',
    './autocomplete.component.scss'
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TCAutocompleteComponent),
			multi: true
		}
	]
})
export class TCAutocompleteComponent extends TCInputComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {
	@ViewChild('search', { static: true }) input: ElementRef;

	@HostListener('window:resize', ['$event'])
	public onResize() {
		setTimeout(() =>{
			this.changeOffsets();
		}, 300);
	}

	@HostListener('document:click', ['$event'])
	public handlelClick(event: Event) {
		let clickedComponent = event.target;
		let inside: boolean = false;

		if (clickedComponent === this.elementAutocomlete.nativeElement) {
				inside = true;
		}
		if (!inside) {
			this.results = [];
		}
	}

	@Input() data: Array<any>;
	@Input() key: string;
	@Input() attach: boolean;

	@Input() listColor: string;
	@Input() listBg: string;
	@Input() listAccentColor: string;

	results: Array<string>;
	arrowKeyLocation: number;
	attached: boolean;

	listWidth: number;
	listLeftOffset: number;
	listTopOffset: number;
	listItemAccentColor: string;
	_data: Array<any>;
	onChange: any = () => {};
	onTouched: any = () => {};

	constructor( 
		private elementAutocomlete: ElementRef,
		private changeDetector: ChangeDetectorRef,
		private sanitizer: DomSanitizer
	) {
		super(elementAutocomlete);

		this.listWidth = 0;
		this.attach = false;
		this.attached = false;
		this.results = [];
		this.arrowKeyLocation = -1;
		this.listAccentColor = '#FF8534';
		this._data = [];
	}

	setResult(results: string[]) {
		if (this.attach && !this.attached) {
			this.attachToBody();
		}

		this.results = results;
		this.arrowKeyLocation = -1;
	}

	attachToBody() {
		document.body.appendChild(this.elementAutocomlete.nativeElement.querySelector('.autocomplete-list'));
		this.attached = true;
	}

	resultSelected(value: string) {
		this.value = value;
		this.results = [];
		this.arrowKeyLocation = -1;
	}

	arrowClick(event: KeyboardEvent) {
		switch(event.keyCode) {
			case 38: if (this.arrowKeyLocation == 0) {
				this.arrowKeyLocation = this.results.length - 1;
			} else {
				this.arrowKeyLocation--;
			};
			break;
			case 40: if (this.arrowKeyLocation == this.results.length - 1) {
				this.arrowKeyLocation = 0;
			} else {
				this.arrowKeyLocation++;
			};
		}
	}

	selectItem() {
		if (this.results.length > 0 && this.arrowKeyLocation > -1 && this.arrowKeyLocation < this.results.length ) {
			this.resultSelected(this.results[this.arrowKeyLocation]);
		}
	}

	changeOffsets() {
    this.listWidth = this.elementAutocomlete.nativeElement.offsetWidth;
    this.listLeftOffset = this.elementAutocomlete.nativeElement.offsetLeft;
    this.listTopOffset = this.elementAutocomlete.nativeElement.offsetTop;
		this.changeDetector.detectChanges();
	}

	public getListStyles() {
		return {
			'background': this.listBg,
			'color'			: this.listColor
		};
	}

	public getHoveredItemStyles() {
		return {
			'background': this.listAccentColor,
		};
	}

  public getHighlitedValue(value: string) {
		let re = new RegExp(this.value.toString(), 'i');
		let match = re.exec(value.toString().trim());

		if (!match) {
			return value;
		}

		const newValue = value.toString().replace(re,
			 '<span style="color: ' + this.listItemAccentColor.toString() +'">' +
			 match[0].toString() + '</span>');

		return this.sanitizer.bypassSecurityTrustHtml(newValue);
	}

	get value() {
		return this.innerValue;
	}

	set value(v) {
		if (v !== this.innerValue) {
			this.innerValue = v;
			this.onChange(v);
		}

		if (this.charLimiting > 0) {
			this.charLength = this.charLimiting - this.innerValue.length;
		}
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	writeValue(value: string) {
		if (value !== this.innerValue) {
			this.innerValue = value;
		}
	}

	ngAfterViewInit() {
		this.listItemAccentColor = this.listAccentColor != '' ? this.listAccentColor : '#e24d4d';
		this.changeOffsets();

		setTimeout(()=> {
			this.changeOffsets();
		}, 500);
	}

	ngOnChanges() {
		this._data = this.data;
	}
}
