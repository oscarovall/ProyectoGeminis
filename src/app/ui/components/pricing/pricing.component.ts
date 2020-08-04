import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'tc-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class TCPricingComponent implements OnInit {
	@HostBinding('class.tc-pricing') true;
	@HostBinding('style.border-color') get getBorderCollor() {return this.borderColor ? this.borderColor : this.accentColor };	

	@Input() title: string;
	@Input() price: number | string;
	@Input() priceDesc: string;
	@Input() list: Array<string>;

	@Input() accentColor: string;

	@Input() headerBg: string;
	@Input() buttonBg: string;
	@Input() borderColor: string;

  constructor() {
		this.title = '';
		this.price = 99;
		this.priceDesc = 'per month';
		this.list = [];
		this.accentColor = '#061e38';
	 }

  ngOnInit() { }
}
