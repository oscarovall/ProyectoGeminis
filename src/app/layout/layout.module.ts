import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UIModule } from '../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { BaseLayoutComponent } from './base-layout';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { NavBarComponent } from './components/nav-bar';
import { SideBarComponent } from './components/side-bar';
import { VerticalLayoutComponent } from './vertical';
import { ExtraLayoutComponent } from './extra';
import { HorizontalLayoutComponent } from './horizontal';
import { MenuComponent } from './components/menu';
import { FooterComponent } from './components/footer';
import { LogoComponent } from './components/logo/logo.component';
import { CloseTaskDialogComponent } from './components/close-task-dialog/close-task-dialog.component';


import { RightMenuComponent } from './components/right-menu/right-menu.component';
import { CalendarComponent } from './components/right-menu/calendar/calendar.component';
import { ProfileComponent } from './components/right-menu/profile/profile.component';
import { AddAppointmentComponent } from './components/right-menu/calendar/add-appointment/add-appointment.component';
import { TasksDuePipe } from '../ui/pipes/tasks-due.pipe';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CreateLeadComponent } from './components/right-menu/create-lead/create-lead.component';
import { OrderModule } from 'ngx-order-pipe';
import { CreateRoleComponent } from './components/right-menu/create-role/create-role.component';
import { AddFormComponent } from './components/right-menu/add-form/add-form.component';
import { SendMessageComponent } from './components/right-menu/send-message/send-message.component';
import { EditCustomerComponent } from './components/right-menu/edit-customer/edit-customer.component';
import { HomeDetailComponent } from './components/right-menu/home-detail/home-detail.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalQUALIFYINGComponent } from './components/modal-qualifying/modal-qualifying.component';
import { CreateDealershipComponent } from './components/right-menu/create-dealership/create-dealership.component';
import { CreateStorageComponent } from './components/right-menu/create-storage/create-storage.component';
import { CreateLotComponent } from './components/right-menu/create-lot/create-lot.component';
import { CreateManufacturerComponent } from './components/right-menu/create-manufacturer/create-manufacturer.component';
import { CreatePlantComponent } from './components/right-menu/create-plant/create-plant.component';
import { CreateCatalogComponent } from './components/right-menu/create-catalog/create-catalog.component';
import { ChangeHomeRsoComponent } from './components/change-home-rso/change-home-rso.component';
import { RejectRsoComponent } from './components/reject-rso/reject-rso.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    MalihuScrollbarModule.forRoot(),
    OrderModule,
    BsDatepickerModule,
    MatTabsModule,
    MatStepperModule,
    TimepickerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    PerfectScrollbarModule
  ],
  declarations: [
    NavBarComponent,
    SideBarComponent,
    MenuComponent,
    VerticalLayoutComponent,
    ExtraLayoutComponent,
    HorizontalLayoutComponent,
    MenuComponent,
    FooterComponent,
    BaseLayoutComponent,
    LogoComponent,
    ProfileComponent,
    RightMenuComponent,
    CalendarComponent,
    AddAppointmentComponent,
    CloseTaskDialogComponent,
    CreateLeadComponent,
    CreateRoleComponent,
    AddFormComponent,
    SendMessageComponent,
    EditCustomerComponent,
    HomeDetailComponent,
    ModalComponent,
    ModalQUALIFYINGComponent,
    CreateDealershipComponent,
    CreateStorageComponent,
    CreateLotComponent,
    CreateManufacturerComponent,
    CreatePlantComponent,
    ChangeHomeRsoComponent,
    ChangeHomeRsoComponent,
    RejectRsoComponent,
    CreateCatalogComponent,
  ],
  entryComponents: [
    CloseTaskDialogComponent,
    ChangeHomeRsoComponent,
    RejectRsoComponent
  ],
  providers: [
    TasksDuePipe,
    CurrencyPipe
  ]
})
export class LayoutModule { }
