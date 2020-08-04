import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthService,
  CalendarService,
  ClassesService,
  CommunicationsService,
  CompanyService,
  DataService,
  LeadsService,
  ManufacturersService,
  RoleService,
  SearchService,
  TemplatesService,
  TraceabilityService,
  UploadFileService,
  UserService,
  WorkflowService,
  ClosingService,
  DeleveriesService,
  PendingTaskService,
  StatusLeadsService,
  FormsService,
  CatalogService,
  ThemeService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    AuthService,
    CalendarService,
    ClassesService,
    CommunicationsService,
    CompanyService,
    DataService,
    LeadsService,
    ManufacturersService,
    RoleService,
    SearchService,
    TemplatesService,
    TraceabilityService,
    UploadFileService,
    UserService,
    WorkflowService,
    ClosingService,
    DeleveriesService,
    PendingTaskService,
    StatusLeadsService,
    FormsService,
    CatalogService,
    ThemeService
  ],
  declarations: []
})
export class ServiceModule {}
