import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { IAppState } from '../../interfaces/state';
import { INotificationState } from '../../interfaces/notification.state';
import { ISettings } from '../../interfaces/settings';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { AppConfig } from '../../app.config';
import { AuthService, CalendarService, DataService, UserService } from '../../services/service.index';
import { ThemeService } from '../../services/theme/theme.service';


@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './vertical.component.scss'
  ],
})
export class VerticalLayoutComponent extends BaseLayoutComponent implements OnInit {

  themeDark = true;

  constructor(
    router: Router,
    fb: FormBuilder,
    store: Store<INotificationState>,
    settingsStore: Store<ISettings>,
    menuStore: Store<IAppState>,
    dataSv: DataService,
    public userService: UserService,
    public authService: AuthService,
    private calService: CalendarService,
    public appConfig: AppConfig,
    private themeService: ThemeService
  ) {
    super(router, fb, store, settingsStore, menuStore, dataSv);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setLightbulb();
  }

  setLightbulb() {
    if (this.themeService.isDarkTheme()) {
      this.themeDark = true;
    } else {
      this.themeDark = false;
    }
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
    this.setLightbulb();
  }

  openRightMenu(rightMenuName: string) {

    this.userService.showHideRightMenu(rightMenuName);
  }

  closeRightMenu() {
    this.userService.hideRightMenu();
    this.calService.displayCreationForm = true;
  }
}
