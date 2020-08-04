import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tc-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TCTabComponent implements OnInit {
	@Input() tabTitle: string;
	@Input() active: boolean;
	@Input() disabled: boolean;
	@Input() icon: string;

  constructor() { }

  ngOnInit() { }
}
