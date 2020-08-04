import { Component,  HostBinding, Input, ContentChildren, AfterContentInit, QueryList, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { TCTabComponent } from './tab/tab.component';


@Component({
  selector: 'tc-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TCTabsComponent implements AfterContentInit, OnChanges, OnInit {
	@ContentChildren(TCTabComponent) tabs: QueryList<TCTabComponent>;
	
	@HostBinding('class.tc-tabs') true;
	@HostBinding('class.default') get getDefaultView() { return this.view == 'default' };
	@HostBinding('class.alternative') get getAlternativeView() { return this.view == 'alternative' };
	
	@Input() color: string;
	@Input() view: string;
	@Input() selectedTab: number;
	max: number;
	constructor( private changeDetector: ChangeDetectorRef ) {
		this.view = 'default'
		this.max = 2;
		this.selectedTab = 1;
	}
	
	ngOnInit() { }

	ngAfterContentInit() {
		this.max = this.tabs.length;
		let activeTabs = this.tabs.filter((tab) => tab.active);
		if (activeTabs.length == 0) {
			this.selectTab(this.tabs.first);
		}
		this.changeDetector.detectChanges();
	}

	ngOnChanges() {
		if (this.tabs && this.tabs.length > 0) {
			this.tabs.toArray().forEach(tab => tab.active = false);
			this.tabs.toArray()[this.selectedTab - 1].active = true;
		}
	}

	selectTab(tab: TCTabComponent) {
		this.tabs.toArray().forEach(tab => tab.active = false);
		tab.active = true;
		this.selectedTab = this.tabs.toArray().indexOf(tab) + 1;
	}

	getTabClasses(tab: TCTabComponent) {
		return {
			'disabled': tab.disabled,
			'active': tab.active,
			'icon': tab.icon != null
		};
	}
}
