import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { AuthService } from '../../../services/auth/auth.service';
import { formatDate } from '@angular/common';
import { Employee } from '../../../models/Employee';
import { LeadsService } from '../../../services/leads/leads.service';

@Component({
  selector: 'app-weekly-metrics',
  templateUrl: './weekly-metrics.component.html',
  styleUrls: ['./weekly-metrics.component.css']
})
export class WeeklyMetricsComponent implements OnInit {



  view: CalendarView = CalendarView.Week;
  viewDate = new Date();
  activeDayIsOpen = false;
  startDate;
  endDate;
  teamMemberSelected = null;
  teamMembers: Employee[];
  includeTeamMembers = true;

  // Doughnut Graph
  public doughnutChartLabels: Label[] = ['Done', 'Pending'];
  public doughnutChartData: MultiDataSet = [
    [20, 20]
  ];
  public colorLow: any[] = [{
    backgroundColor: ['#bd2536', '#301e4e'],
    borderColor: 'transparent',
  }];
  public colorMedium: any[] = [{
    backgroundColor: ['#00529b', '#0a2763'],
    borderColor: 'transparent',
  }];
  public colorHigh: any[] = [{
    backgroundColor: ['#00529b', '#0a2763'],
    borderColor: 'transparent',
  }];

  public doughnutChartType: ChartType = 'doughnut';
  weeklyMetrics;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private leadService: LeadsService
  ) {
    this.getTeamMembers();
    this.calculateDateRange();
  }

  ngOnInit() {
  }

  calculateDateRange() {
    const date = new Date(this.viewDate);
    const startDay = date.getDate() - date.getDay();
    const lastDay = startDay + 6;
    this.startDate = new Date(date.setDate(startDay));
    this.endDate = new Date(date.setDate(lastDay));
    this.getWeeklyMetrics();
  }

  getWeeklyMetrics() {
    let id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.includeTeamMembers = true;
    if (this.teamMemberSelected) {
      id = this.teamMemberSelected;
      this.includeTeamMembers = false;
    }
    const startDate = formatDate(this.startDate, 'yyyy/MM/dd', 'en-US');
    const endDate = formatDate(this.endDate, 'yyyy/MM/dd', 'en-US');

    this.dashboardService.getWeeklyMetrics(id, startDate, endDate, this.includeTeamMembers).subscribe((response) => {
      this.weeklyMetrics = response.results;
      for (let index = 0; index < this.weeklyMetrics.length; index++) {
        const metric = this.weeklyMetrics[index];
        metric.pending = (metric.goal - metric.done < 0) ? 0 : metric.goal - metric.done ;
        if (metric.compliance === 'low') {
          metric.color = this.colorLow;
        } else if (metric.compliance === 'medium') {
          metric.color = this.colorMedium;
        } else if (metric.compliance === 'high') {
          metric.color = this.colorHigh;
        }
      }
    });
  }

  getTeamMembers() {
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.leadService.getTeamMembers(id).subscribe((employeeList) => {
      this.teamMembers = employeeList;
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }
}



