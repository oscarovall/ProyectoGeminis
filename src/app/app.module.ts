import { AppConfig } from './app.config';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatGridListModule, MatExpansionModule } from '@angular/material';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { StoreModule } from '@ngrx/store';
import { MenuReducer } from './store/reducers/menu.reducer';
import { NotificationReducer } from './store/reducers/notification.reducer';
import { SettingsReducer } from './store/reducers/settings.reducer';

import { AppComponent } from './app.component';

import { ROUTES, RoutingModule } from './routing/routing.module';
import { UIModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from './layout/layout.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './logout/logout/logout.component';
// import { APP_ROUTES } from './app.routes';
import { ServiceModule } from './services/service.module';
import { NotEnoughRightsComponent } from './not-enough-rights/not-enough-rights/not-enough-rights.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NotEnoughRightsComponent,
  ],
  imports: [
    BrowserModule,
    // PAGES_ROUTES,
    MatTabsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatExpansionModule,
    LeafletModule.forRoot(),
    BrowserAnimationsModule,
    NgbModalModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    HttpClientModule,
    StoreModule.forRoot({
      menuState: MenuReducer,
      notifications: NotificationReducer,
      settings: SettingsReducer
    }),
    LayoutModule,
    UIModule,
    PagesModule,
    RoutingModule,
    ServiceModule,
   // APP_ROUTES,
    BsDatepickerModule.forRoot()
  ],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } }, DatePipe, AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
