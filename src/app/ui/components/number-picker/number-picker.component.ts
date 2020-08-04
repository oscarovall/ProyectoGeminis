import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "number-picker",
  templateUrl: "./number-picker.component.html",
  styleUrls: ["./number-picker.component.css"]
})
export class NumberPickerComponent implements OnInit {
  // value: number = 0;
  max: number = 1000;
  min: number = 0;
  @Input() disabled: boolean;
  @Input() value: number = 0;
  @Input() required: string;
  @Output() change = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {
    if (!this.value) {
      this.value = 0;
    }
  }

  plus() {
    if (this.value < this.max && !this.disabled) {
      this.value++;
      this.change.emit(this.value);
    }
  }
  subt() {
    if (this.value > this.min && !this.disabled) {
      this.value--;
      this.change.emit(this.value);
    }
  }
}
