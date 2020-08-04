import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


import { Store } from '@ngrx/store';
import { IAppState } from '../../interfaces/state';
import { INotificationState } from '../../interfaces/notification.state';
import { ISettings } from '../../interfaces/settings';

import { toggleMenu } from '../../animations/menuAnimations';
import { searchApear } from '../../animations/searchAnimation';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { DataService } from '../../services/service.index';

@Component({
  selector: 'horizontal-layout',
  templateUrl: './horizontal.component.html',
	styleUrls: [
    '../base-layout/base-layout.component.scss',
		 './horizontal.component.scss'
	],
	animations: [toggleMenu, searchApear]
})
export class HorizontalLayoutComponent extends BaseLayoutComponent implements OnInit  {
  constructor(
    router: Router,
    fb: FormBuilder,
    store: Store<INotificationState>,
    settingsStore: Store<ISettings>,
    menuStore: Store<IAppState>,
    dataSv: DataService
	) {
    super(router, fb, store, settingsStore, menuStore, dataSv);
  }

	ngOnInit() {
    super.ngOnInit();
	}
}
