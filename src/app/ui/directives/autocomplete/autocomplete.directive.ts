import { Directive, Input, HostBinding, OnInit, HostListener, Output, EventEmitter, OnChanges, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[tcAutocomplete]'
})
export class TCAutocompleteDirective implements OnInit, OnChanges {
  @Input() tcAutocomplete: Array<any>;
  @Input() key: string;

  @Output() resultsChanged: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  private queryField: string;
  private values: Array<string>;
  private results: Array<string>;

  constructor(private el: ElementRef, private rend: Renderer2) {
    this.tcAutocomplete = [];
    this.key = '';
    this.queryField = '';
    this.results = [];
    this.values = [];
  }

  ngOnInit() {
    if (typeof this.tcAutocomplete[0] === typeof 'str') {
      this.values = this.tcAutocomplete;
    } else if (this.key != '') {
      this.tcAutocomplete.forEach((element) => {
        this.values.push(element[this.key.toString().toLowerCase()].toString());
      })
    }
  }

  @HostListener('input', ['$event.target.value'])
  public search(event): void {
    this.queryField = event;
    if (this.queryField !== '') {
      this.results = this.values.filter((item: string) => {
        return item.toString().toLowerCase().startsWith(this.queryField.toLowerCase().trim());
      });
    } else {
      this.results = [];
    }
    this.resultsChanged.emit(this.results);
  }

  ngOnChanges() {
    this.ngOnInit();
  }
}
