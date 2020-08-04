import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { Lead } from '../../../models/crm/Lead';
import { AuthService } from '../../../services/auth/auth.service';
import { LeadsService } from '../../../services/leads/leads.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { AppConfig } from '../../../app.config';
import { Template } from '../../../models/Template';
import { Appointment } from '../../../models/crm/Appointment';
import { CustomerService } from '../../../services/customer/customer.service';
import { Customer } from '../../../models/crm/Customer';
import { CustomerStatus } from '../../../models/crm/CustomerStatus';
import { TemplatesService } from '../../../services/templates/templates.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;
  cargando: boolean = true;
  selectedStatus: number = null;
  status: CustomerStatus[];
  arrayWords: Array<string>;
  wordsFilter: string;

  constructor(
    private router: Router,
    private usrService: UserService,
    public appConfig: AppConfig,
    private config: AppConfig,
    private customerService: CustomerService,
    private tService: TemplatesService,
  ) {
    this.customerService.selectedCustomerSaved.subscribe((customer: Customer) => this.getCustomersByTeamMember());
    this.changePage(this.currentPage);
  }

  ngOnInit() {
    this.getCustomerStatus();
  }


  changePage(currentPage) {
    this.cargando = true;
    this.currentPage = currentPage;
    this.getCustomersByTeamMember();
  }

  getCustomerStatus() {
    this.customerService.getCustomerStatus().subscribe((res) => {
      console.log('Status', res);
      this.status = res;
    });
  }

  getCustomersByTeamMember() {
    console.log('status selected', this.selectedStatus);
    this.customerService.getCustomersByTeamMember(14, this.pageSize, this.currentPage, this.selectedStatus, this.arrayWords)
    .subscribe((resp) => {
      this.totalPages = resp.pageCount * 10;
      console.log('respuesta', resp);
      this.customers = resp.results;
      this.cargando = false;
    });
  }

  changeStatus() {
    this.currentPage = 1;
    this.getCustomersByTeamMember();
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  redirect(url: string) {
    this.router.navigate([`${url}`]);
  }

  editCustomer(selectedCustomer: Customer): void {
    this.usrService.showRightMenu(this.appConfig.rightMenu.editCustomer);
    setTimeout(() => { this.customerService.setSelectedCustomer(selectedCustomer); });
  }

  pipeStatus(status: string) {
    if (status === this.appConfig.customerStatus.new) {
      return 'info';
    } if (status === this.appConfig.customerStatus.contacted) {
      return 'success';
    } if (status === this.appConfig.customerStatus.messageSent) {
      return 'success';
    } if (status === this.appConfig.customerStatus.appointmentSet) {
      return 'success';
    } if (status === this.appConfig.customerStatus.lost) {
      return 'error';
    } else {
      return 'info';
    }
  }

  sendNewMessage(selectedCustomer: Customer) {
    this.usrService.showHideRightMenu(this.config.rightMenu.sendMessage);
    setTimeout(() => { this.customerService.setSelectedCustomer(selectedCustomer); });
  }

  redirectCall(customer: Customer) {
    this.tService.redirectCall(customer.mobileNum);
    this.tService.setIncrementCall(customer.customerId).subscribe((res) => {
      console.log('Increment Call seted');
    });
  }

  onKeyUp(words) {
    this.currentPage = 1;
    if (words && words !== '') {
      this.filter(words);
    } else {
      this.arrayWords = [];
      this.getCustomersByTeamMember();
    }
  }

  filter(filterValue: string) {
    if (filterValue.length && filterValue.length >= 3) {
      let arreglo = filterValue.split(' ');
      arreglo = arreglo.filter(el => el !== '');
      arreglo = arreglo.filter(el => el.length !== 1);
      this.arrayWords = arreglo;
      this.getCustomersByTeamMember();
    }
  }

}
