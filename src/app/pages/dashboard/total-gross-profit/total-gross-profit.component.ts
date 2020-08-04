import { Component, OnInit } from '@angular/core';
import { Store } from '../../../models/Store';
import { CalendarView } from 'angular-calendar';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { LeadsService } from '../../../services/leads/leads.service';
import { AuthService } from '../../../services/auth/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-total-gross-profit',
  templateUrl: './total-gross-profit.component.html',
  styleUrls: ['./total-gross-profit.component.css']
})
export class TotalGrossProfitComponent implements OnInit {

  storeSelected = '';
  stores: Store[] = null;
  sources = null;
  view: CalendarView = CalendarView.Week;
  viewDate = new Date();
  activeDayIsOpen = false;
  startDate;
  endDate;
  totalGrossProfit;
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

  ngOnInit() { }

  getTotalGrossProfit() {
    this.cargando = true;
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    const startDate = formatDate(this.startDate, 'yyyy/MM/dd', 'en-US');
    const endDate = formatDate(this.endDate, 'yyyy/MM/dd', 'en-US');

    this.leadService.getTotalGrossProfit(id, startDate, endDate, this.storeSelected).subscribe((response) => {
      this.totalGrossProfit = response.results;
      this.totalLeads = 0;
      for (let index = 0; index < this.totalGrossProfit.length; index++) {
        const lead = this.totalGrossProfit[index];
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
    this.getTotalGrossProfit();
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
