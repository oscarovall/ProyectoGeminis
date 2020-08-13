import { Employee } from './../../../models/Employee';
import { AppConfig } from './../../../app.config';
import { Component, OnInit } from '@angular/core';
import { Lead } from '../../../models/crm/Lead';
import { AuthService, LeadsService } from '../../../services/service.index';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { CalendarEvent } from 'angular-calendar';
import { Appointment } from '../../../models/crm/Appointment';
import { Customer } from '../../../models/crm/Customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { TemplatesService } from '../../../services/templates/templates.service';

@Component({
  selector: 'app-lead-table',
  templateUrl: './lead-table.component.html',
  styleUrls: ['./lead-table.component.css']
})
export class LeadTableComponent implements OnInit {

  teamMemberSelected = null;
  teamMembers: Employee[];
  leads: Lead[];
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;
  cargando: boolean = true;

  constructor(
    private authService: AuthService,
    private leadService: LeadsService,
    private router: Router,
    private usrService: UserService,
    private cService: CalendarService,
    private tService: TemplatesService,
    private customerService: CustomerService,
    public appConfig: AppConfig,
    private config: AppConfig,
  ) {
    this.changePage(this.currentPage);
    this.getTeamMembers();
  }

  ngOnInit() {

  }

  getTeamMembers() {
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.leadService.getTeamMembers(id).subscribe((employeeList) => {
      this.teamMembers = employeeList;
    });
  }

  changePage(currentPage) {
    this.cargando = true;
    this.currentPage = currentPage;
    if (this.teamMemberSelected) {
      this.getLeadsByTeamMember(currentPage);

    } else {
      this.getLeadByTeamOwner(currentPage);
    }

  }

  getLeadByTeamOwner(currentPage) {
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.leadService.getLeadByTeamOwner(id, this.pageSize, currentPage, []).subscribe((pagination) => {
      this.totalPages = pagination.pageCount * 10;
      this.leads = pagination.results;
      this.cargando = false;
    });
  }

  getLeadsByTeamMember(currentPage) {
    this.leadService.getLeadByTeamMember(this.teamMemberSelected, this.pageSize, currentPage, []).subscribe((pagination) => {
      this.totalPages = pagination.pageCount * 10;
      this.leads = pagination.results;
      this.cargando = false;
    });
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  redirect(url: string) {
    this.router.navigate([`${url}`]);
  }

  addEvent(selectedLead: Lead): void {
    const newAppointmet = new Appointment(new Date(), this.appConfig.channelType.email, this.appConfig.appointmentType.appointment);
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(newAppointmet); });
    setTimeout(() => { this.cService.setSelectedCustomer(selectedLead.mainCustomer); });
  }

  // pipeStatus(status: string) {
  //   if (status === this.appConfig.leadStatus.active) {
  //     return 'info';
  //   } if (status === this.appConfig.leadStatus.closed) {
  //     return 'success';
  //   } if (status === this.appConfig.leadStatus.delivery) {
  //     return 'success';
  //   } if (status === this.appConfig.leadStatus.lost) {
  //     return 'error';
  //   } if (status === this.appConfig.leadStatus.potencial) {
  //     return 'info';
  //   } if (status === this.appConfig.leadStatus.pre) {
  //     return 'warning';
  //   } if (status === this.appConfig.leadStatus.qualified) {
  //     return 'info';
  //   } if (status === this.appConfig.leadStatus.rejected) {
  //     return 'error';
  //   } if (status === this.appConfig.leadStatus.stalled) {
  //     return 'error';
  //   } else {
  //     return 'info';
  //   }
  // }

  sendNewMessage(selectedLead: Lead) {
    this.usrService.showHideRightMenu(this.config.rightMenu.sendMessage);
    setTimeout(() => { this.customerService.setSelectedCustomer(selectedLead.mainCustomer); });
    setTimeout(() => { this.customerService.setSelectedLead(selectedLead); });
  }

  redirectCall(selectedLead: Lead) {
    this.tService.redirectCall(selectedLead.mainCustomer.mobileNum);
    this.tService.setIncrementCall(selectedLead.mainCustomer.customerId).subscribe((res) => {
    });
  }

}
