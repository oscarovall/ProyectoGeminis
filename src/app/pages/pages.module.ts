import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UIModule } from '../ui/ui.module';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatTabsModule } from '@angular/material';


import { WorkflowComponent } from './admin/workflow/workflow.component';

import { LeadComponent } from './crm/lead/lead.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GaugeChartModule } from 'angular-gauge-chart';
import { ModalConditionComponent } from './admin/workflow/modal-condition/modal-condition.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalEmailComponent } from './admin/workflow/modal-email/modal-email.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ModalFillClassComponent } from './admin/workflow/modal-fill-class/modal-fill-class.component';
import { ModalAssignRoleComponent } from './admin/workflow/modal-assign-role/modal-assign-role.component';
import { ModalApproveByComponent } from './admin/workflow/modal-approve-by/modal-approve-by.component';
import { ModalCreateTaskComponent } from './admin/workflow/modal-create-task/modal-create-task.component';
import { ModalShowCalculatorComponent } from './admin/workflow/modal-show-calculator/modal-show-calculator.component';
import { ModalCreateGroupComponent } from './admin/workflow/modal-create-group/modal-create-group.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DocUploadComponent } from '../ui/components/file-uploader/doc-upload/doc-upload.component';
import { MatTimepickerModule } from 'mat-timepicker';
import { EmailComponent } from './admin/email/email.component';
import { QuillModule } from 'ngx-quill';
import { OrderModule } from 'ngx-order-pipe';
import { CalendarComponent } from './apps/aosp/calendar/calendar.component';
import { RolesComponent } from './admin/roles/roles.component';
import { UsersComponent } from './admin/users/users.component';
import { NgbdPaginationAdvancedModule } from '../ui/components/pagination-advanced/pagination-advanced.module';
import { LeadsComponent } from './crm/leads/leads.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeadTableComponent } from './dashboard/lead-table/lead-table.component';
import { PromoHousesComponent } from './dashboard/promo-houses/promo-houses.component';
import { WidgetsComponent } from './dashboard/widgets/widgets.component';
import { PendingTaskComponent } from './dashboard/widgets/pending-task/pending-task.component';
import { TotalClosingsComponent } from './dashboard/widgets/total-closings/total-closings.component';
import { PendingDeliveriesComponent } from './dashboard/widgets/pending-deliveries/pending-deliveries.component';
import { LeadsWidgetComponent } from './dashboard/widgets/leads-widget/leads-widget.component';
import { WeeklyCalendarComponent } from './dashboard/weekly-calendar/weekly-calendar.component';
import { TaskComponent } from './dashboard/task/task.component';
import { PendingTaskTableComponent } from './dashboard/task/pending-task-table/pending-task-table.component';
import { TeamTaskTableComponent } from './dashboard/task/team-task-table/team-task-table.component';
import { PendingRsoComponent } from './dashboard/pending-rso/pending-rso.component';
import { LeadsReceivedComponent } from './dashboard/leads-received/leads-received.component';

import { HomeDeliveryComponent } from './dashboard/home-delivery/home-delivery.component';
import { InventoryComponent } from './dashboard/inventory/inventory.component';
import { GraphAppoinmetsComponent } from './dashboard/graph-appoinmets/graph-appoinmets.component';
import { DealsComponent } from './dashboard/widgets/deals/deals.component';
import { ClosingComponent } from './dashboard/widgets/closing/closing.component';
import { TotalGrossProfitComponent } from './dashboard/total-gross-profit/total-gross-profit.component';
import { WeeklyMetricsComponent } from './dashboard/weekly-metrics/weekly-metrics.component';
import { GraficasComponent } from './dashboard/graficas/graficas.component';
import { CustomersComponent } from './crm/customers/customers.component';
import { FormsComponent } from './admin/forms/forms.component';
import { EjemploComponent } from './dashboard/ejemplo/ejemplo.component';
import { PhoneNumberPipe } from '../ui/pipes/phone-number.pipe';
import { HomeInformationComponent } from './crm/lead/home-information/home-information.component';
import { HomesComponent } from './crm/lead/home-information/homes/homes.component';
import { PromoHomesComponent } from './crm/lead/home-information/promo-homes/promo-homes.component';
import { HomeComponent } from './crm/lead/home-information/home/home.component';
import {  MatGridListModule, MatExpansionModule } from '@angular/material';
import { SlickModule } from 'ngx-slick';
import { InventoryTableComponent } from './inventory/inventory-table/inventory-table.component';
import { DealershipsComponent } from './admin/dealerships/dealerships.component';
import { ManufacturerComponent } from './admin/manufacturer/manufacturer/manufacturer.component';


// import { PAGES_ROUTES } from './pages.routes';


@NgModule({
  imports: [
    OrderModule,
   // PAGES_ROUTES,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSvo0x8v3C6aFWcSi2zooOC9tqGCOqCj4'
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CommonModule,
    ChartsModule,
    RouterModule,
    UIModule,
    LeafletModule.forRoot(),
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule,
    GaugeChartModule,
    MatDialogModule,
    NgbModule,
    TimepickerModule.forRoot(),
    NgxMaterialTimepickerModule,
    MatSnackBarModule,
    MatTimepickerModule,
    QuillModule.forRoot(),
    NgbdPaginationAdvancedModule,
    MatGridListModule,
    MatExpansionModule,
    SlickModule.forRoot()
  ],
  declarations: [

    // Template example pages
    WorkflowComponent,

    LeadComponent,
    ModalConditionComponent,
    ModalEmailComponent,
    ModalFillClassComponent,
    ModalAssignRoleComponent,
    ModalApproveByComponent,
    ModalCreateTaskComponent,
    ModalShowCalculatorComponent,
    ModalCreateGroupComponent,
    EmailComponent,
    CalendarComponent,
    RolesComponent,
    UsersComponent,
    LeadsComponent,
    DashboardComponent,
    LeadTableComponent,
    PromoHousesComponent,
    WidgetsComponent,
    PendingTaskComponent,
    TotalClosingsComponent,
    PendingDeliveriesComponent,
    LeadsWidgetComponent,
    WeeklyCalendarComponent,
    TaskComponent,
    PendingTaskTableComponent,
    TeamTaskTableComponent,
    PendingRsoComponent,
    LeadsReceivedComponent,
    HomeDeliveryComponent,
    InventoryComponent,
    GraphAppoinmetsComponent,
    DealsComponent,
    ClosingComponent,
    TotalGrossProfitComponent,
    WeeklyMetricsComponent,
    GraficasComponent,
    CustomersComponent,
    FormsComponent,
    EjemploComponent,
    HomeInformationComponent,
    HomesComponent,
    PromoHomesComponent,
    HomeComponent,
    InventoryTableComponent,
    DealershipsComponent,
    ManufacturerComponent
  ],
  entryComponents: [
    ModalConditionComponent,
    ModalEmailComponent,
    ModalCreateGroupComponent,
    DocUploadComponent,
    ModalFillClassComponent,
    ModalApproveByComponent,
    ModalCreateTaskComponent
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
    PhoneNumberPipe
  ]
})
export class PagesModule { }
