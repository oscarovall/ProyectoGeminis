import { Component, OnInit, HostBinding, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'tc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class TCAlertComponent implements OnInit {
	@HostBinding('class.tc-alert') true;
	@HostBinding('class.outline') get getOutline() { return this.outline; }
	@HostBinding('class.with-icon') get getIcon() { return this.icon !== undefined; }
	@HostBinding('class.icon-right') get getIconRight() { return this.iconRight && this.icon !== undefined; }
	@HostBinding('class.alert-default') get getAlertDefault() { return this.view === 'default'; }
	@HostBinding('class.alert-success') get getAlertSuccess() { return this.view === 'success'; }
	@HostBinding('class.alert-error') get getAlertError() { return this.view === 'error'; }
	@HostBinding('class.alert-info') get getAlertInfo() { return this.view === 'info'; }
	@HostBinding('class.alert-warning') get getAlertWarning() { return this.view === 'warning'; }
	
	@Input() title: string;
	@Input() view: string;
	@Input() icon: string;
	@Input() iconRight: boolean;
	@Input() removable: boolean;
	@Input() outline: boolean;
	@Input() borderless: boolean;

  constructor( private element: ElementRef, private renderer: Renderer2 ) {
		this.view = 'default';
		this.iconRight = false;
	}

	ngOnInit() { }
	
	public removeAlert() {
		this.element.nativeElement.remove();
	}
}
