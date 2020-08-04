import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'tc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class TCListComponent {
	@HostBinding('class.tc-list') true;

  constructor() { }
}
