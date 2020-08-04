import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'tc-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class TCListItemComponent implements OnInit {
	@HostBinding('class.tc-list-item') true;

	@Input() title: string;
	@Input() img: string;

  constructor() { }

  ngOnInit() { }
}
