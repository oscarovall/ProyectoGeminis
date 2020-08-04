import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { Store } from '../../../models/Store';
import { CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTitleFormatter } from 'angular-calendar';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { formatDate } from '@angular/common';
import { LeadsService } from '../../../services/leads/leads.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-leads-received',
  templateUrl: './leads-received.component.html',
  styleUrls: ['./leads-received.component.css']
})
export class LeadsReceivedComponent implements OnInit {

  storeSelected = '';
  sourceSelected = '';
  stores: Store[] = null;
  sources = null;
  view: CalendarView = CalendarView.Week;
  viewDate = new Date();
  activeDayIsOpen = false;
  startDate;
  endDate;
  leadsReceived;
  totalLeads = 0;
  cargando: boolean = true;
  constructor(
    private dashboardService: DashboardService,
    private leadService: LeadsService,
    private authService: AuthService
  ) {
    this.calculateDateRange();
    this.getStores();
    this.getSources();
  }

  ngOnInit() {
    this.getLeadsReceived()
  }

  getLeadsReceived() {
    this.cargando = true;
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    const startDate = formatDate(this.startDate, 'yyyy/MM/dd', 'en-US');
    const endDate = formatDate(this.endDate, 'yyyy/MM/dd', 'en-US');

    this.leadService.getLeadsReceived(id, startDate, endDate, this.sourceSelected, this.storeSelected).subscribe((response) => {
      this.leadsReceived = response.results;
      this.totalLeads = 0;
      for (let index = 0; index < this.leadsReceived.length; index++) {
        const lead = this.leadsReceived[index];
        this.totalLeads = this.totalLeads + lead.total;

      }
      this.cargando = false;
    });

  }

  calculateDateRange() {
    this.cargando = true;
    const date = new Date(this.viewDate);
    const startDay = date.getDate() - date.getDay();
    const lastDay = startDay + 6;
    this.startDate = new Date(date.setDate(startDay));
    this.endDate = new Date(date.setDate(lastDay));
    this.getLeadsReceived();
  }

  getStores() {
    this.dashboardService.getStores().subscribe((res) => {
      this.stores = res.results;
    });
  }

  getSources() {
    this.dashboardService.getSources().subscribe((res) => {
      this.sources = res.results;
    });
  }



}
