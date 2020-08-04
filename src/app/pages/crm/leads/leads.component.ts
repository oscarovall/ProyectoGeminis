import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../models/crm/Appointment';
import { AuthService } from '../../../services/auth/auth.service';
import { LeadsService } from '../../../services/leads/leads.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { AppConfig } from '../../../app.config';
import { Employee } from '../../../models/Employee';
import { Lead } from '../../../models/crm/Lead';
import { Customer } from '../../../models/crm/Customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { TemplatesService } from '../../../services/templates/templates.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styles: []
})
export class LeadsComponent implements OnInit {

  teamMemberSelected = null;
  teamMembers: Employee[];
  leads: Lead[];
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;
  loading: boolean = true;
  wordsFilter: string;
  arrayWords: Array<string>;

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
    this.loading = true;
    this.currentPage = currentPage;
    if (this.teamMemberSelected) {
      this.getLeadsByTeamMember(currentPage);

    } else {
      this.getLeadByTeamOwner(currentPage);
    }

  }

  getLeadByTeamOwner(currentPage) {
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.leadService.getLeadByTeamOwner(id, this.pageSize, currentPage, this.arrayWords).subscribe((pagination) => {
      this.totalPages = pagination.pageCount * 10;
      this.leads = pagination.results;
      this.loading = false;
    });
  }

  getLeadsByTeamMember(currentPage) {
    this.leadService.getLeadByTeamMember(this.teamMemberSelected, this.pageSize, currentPage, this.arrayWords).subscribe((pagination) => {
      this.totalPages = pagination.pageCount * 10;
      this.leads = pagination.results;
      this.loading = false;
    });
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  redirect(url: string) {
    this.router.navigate([`${url}`]);
  }

  addEvent(lead: Lead): void {
    const newAppointmet = new Appointment(new Date(), this.appConfig.channelType.email, this.appConfig.appointmentType.appointment);
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(newAppointmet); });
    setTimeout(() => { this.cService.setSelectedCustomer(lead.mainCustomer); });
  }

  pipeStatus(status: string) {
    if (status === this.appConfig.leadStatus.active) {
      return 'info';
    } if (status === this.appConfig.leadStatus.closed) {
      return 'success';
    } if (status === this.appConfig.leadStatus.delivery) {
      return 'success';
    } if (status === this.appConfig.leadStatus.lost) {
      return 'error';
    } if (status === this.appConfig.leadStatus.potencial) {
      return 'info';
    } if (status === this.appConfig.leadStatus.pre) {
      return 'warning';
    } if (status === this.appConfig.leadStatus.qualified) {
      return 'info';
    } if (status === this.appConfig.leadStatus.rejected) {
      return 'error';
    } if (status === this.appConfig.leadStatus.stalled) {
      return 'error';
    } else {
      return 'info';
    }
  }

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

  onKeyUp(words) {
    this.currentPage = 1;
    if (words && words !== '') {
      this.filter(words);
    } else {
      this.arrayWords = [];
      this.changePage(1);
    }
  }

  filter(filterValue: string) {
    if (filterValue.length && filterValue.length >= 3) {
      let arreglo = filterValue.split(' ');
      arreglo = arreglo.filter(el => el !== '');
      arreglo = arreglo.filter(el => el.length !== 1);
      this.arrayWords = arreglo;
      this.changePage(1);
    }
  }
}
