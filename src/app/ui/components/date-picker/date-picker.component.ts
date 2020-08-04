import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() myDateValue: Date;
  @Input() required: string;
  @Output() change = new EventEmitter<Event>();
  constructor() { }

  ngOnInit() {
  }
  onChange(eventChange: Event){
    this.change.emit(eventChange);
  }

}
