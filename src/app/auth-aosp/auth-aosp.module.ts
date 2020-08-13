import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UIModule } from '../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout/logout.component';
import { NotEnoughRightsComponent } from './not-enough-rights/not-enough-rights/not-enough-rights.component';
import { AuthAospComponent } from './auth-aosp/auth-aosp.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    MalihuScrollbarModule.forRoot(),
    BsDatepickerModule,
    MatTabsModule,
    TimepickerModule,
    MatAutocompleteModule,
    MatFormFieldModule,

  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    NotEnoughRightsComponent,
    AuthAospComponent,
  ],
  entryComponents: [

  ],
  providers: [

  ]
})
export class AuthAospModule { }
