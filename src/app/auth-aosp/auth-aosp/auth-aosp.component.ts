import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { IAppState } from '../../interfaces/state';
import { INotificationState } from '../../interfaces/notification.state';
import { ISettings } from '../../interfaces/settings';
import { BaseLayoutComponent } from '../../layout/base-layout/base-layout.component';
import { AppConfig } from '../../app.config';
import { AuthService, CalendarService, DataService, UserService } from '../../services/service.index';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-auth-aosp',
  templateUrl: './auth-aosp.component.html',
  styleUrls: ['./auth-aosp.component.css']
})
export class AuthAospComponent extends BaseLayoutComponent implements OnInit {

  constructor(
    router: Router,
    fb: FormBuilder,
    store: Store<INotificationState>,
    settingsStore: Store<ISettings>,
    menuStore: Store<IAppState>,
    dataSv: DataService,
    public userService: UserService,
    public authService: AuthService,
    public appConfig: AppConfig,
  ) {
    super(router, fb, store, settingsStore, menuStore, dataSv);
  }

  ngOnInit() {
  }

}
