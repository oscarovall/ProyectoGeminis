import { Employee } from './../../../models/Employee';
import { AppConfig } from './../../../app.config';
import { Component, OnInit } from '@angular/core';
import { Lead } from '../../../models/crm/Lead';
import { AuthService } from '../../../services/service.index';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject, from } from 'rxjs';
import { formatDate } from '@angular/common';
import {
  CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTitleFormatter
} from 'angular-calendar';
import { Appointment } from '../../../models/crm/Appointment';
import { CustomEventTitleFormatter } from '../../apps/aosp/calendar/custom-event-title-formatter.provider';
import { Chart, ChartOptions } from 'chart.js';
import { GraphAppointmentsService } from '../../../services/graphAppointment/graph-appointments.service';
import { LeadsService } from '../../../services/leads/leads.service';



@Component({
  selector: 'app-graph-appoinmets',
  templateUrl: './graph-appoinmets.component.html',
  styleUrls: ['./graph-appoinmets.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ]
})
export class GraphAppoinmetsComponent implements OnInit {

  view: CalendarView = CalendarView.Week;
  viewDate = new Date();
  activeDayIsOpen = false;
  startDate;
  endDate;
  chart;
  teamMemberSelected: number = null;
  teamMembers: Employee[];
  leads: Lead[];
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;

  selectedEvent: CalendarEvent;
  eventActive: boolean;
  newEvent: boolean;

  selectedStartDate: string;
  selectedEndDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  selectedTitle: string;
  IncludeTeamMebers: boolean = true;
  actions: CalendarEventAction[];

  refresh: Subject<any>;
  events: CalendarEvent[] = [];

  cargando: boolean = true;



  constructor(
    private authService: AuthService,
    private leadService: LeadsService,
    private router: Router,
    private usrService: UserService,
    private cService: CalendarService,
    private graphAppointmentsService: GraphAppointmentsService,
    public datepipe: DatePipe,
    public appConfig: AppConfig, public dialog: MatDialog, private _snackBar: MatSnackBar) {

    this.actions = [

    ];

    this.activeDayIsOpen = true;

    this.viewDate = new Date();
    this.refresh = new Subject();

    // Updating Events from Calendar
    if (this.cService.allEvents) {
      this.updateEvents();
    }
    this.cService.allEventsChanged.subscribe((pendingTasks: Appointment[]) => {
      this.updateEvents();
    });


    this.selectedEvent = this.events[0];
    this.eventActive = false;
    this.newEvent = false;

    this.selectedEndDate = '';
    this.selectedStartDate = '';
    this.selectedTitle = '';
    this.selectedStartTime = '';
    this.selectedEndTime = ''

    this.activeDayIsOpen = true;

    this.viewDate = new Date();
    this.refresh = new Subject();

    this.changePage(this.currentPage);
    this.getTeamMembers();
    this.calculateDateRange();
  }

  ngOnInit() {

    this.getCount();
  }

  getTeamMembers() {
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.leadService.getTeamMembers(id).subscribe((employeeList) => {
      this.teamMembers = employeeList;
    });
  }


  changePage(currentPage) {
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
    });
  }

  getLeadsByTeamMember(currentPage) {
    this.leadService.getLeadByTeamMember(this.teamMemberSelected, this.pageSize, currentPage, []).subscribe((pagination) => {
      this.totalPages = pagination.pageCount * 10;
      this.leads = pagination.results;
    });
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  editOnRightMenu(event: CalendarEvent) {
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(event.meta.appointment); });
  }

  updateEvents() {
    this.events = [];
    this.cService.allEvents.forEach((appointment: Appointment) => {
      const event = {
        start:
          (appointment.appointmentTypeId === this.appConfig.appointmentType.appointment) ? appointment.startDate :
            (appointment.appointmentTypeId === this.appConfig.appointmentType.pendingTask) ? appointment.endDate : appointment.endDate,
        end: appointment.endDate,
        title: appointment.title,

        actions: this.actions,
        cssClass:
          (appointment.appointmentTypeId === this.appConfig.appointmentType.appointment) ? 'event-appointment' :
            (appointment.appointmentTypeId === this.appConfig.appointmentType.pendingTask) ? 'event-todo' : 'event-reminder',
        meta: {
          appointment
        }
      };
      this.events.push(event);
    });
    this.refresh.next();


  }

  getCount() {
    const startDate = formatDate(this.startDate, 'yyyy/MM/dd', 'en-US');
    const endDate = formatDate(this.endDate, 'yyyy/MM/dd', 'en-US');
    if (this.teamMemberSelected) {
      const id = this.teamMemberSelected; 
      const IncludeTeamMebers = false;
      this.leadService.getCount(id, IncludeTeamMebers, startDate, endDate).subscribe((response) => {
        this.paintGrapfic(response);
      });
    } else {
      const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
      const IncludeTeamMebers = true;
      this.leadService.getCount(id, IncludeTeamMebers, startDate, endDate).subscribe((response) => {
        this.paintGrapfic(response);
      });
    }
  }

  paintGrapfic(response: any) {
    this.cargando = true;
    if (!response || !response.results) {
      return;
    }

    var dataClosed = [];
    var dataTotal = [];
    var dataLabel = [];


    for (var i = 0; i < response.results.length; i++) {
      dataTotal.push(response.results[i].total);
      dataClosed.push(response.results[i].closed);
      dataLabel.push(response.results[i].dayOfWeek);
    };


    var speedCanvas = document.getElementById("speedChart") as HTMLCanvasElement;

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;

    var dataFirst = {
      label: "Appointments Set",
      data: dataTotal,
      lineTension: 0,
      fill: false,
      borderColor: '#5ba6e6'
    };


    var dataSecond = {
      label: "Appointments Shown",
      data: dataClosed,
      lineTension: 0,
      fill: false,
      borderColor: '#8d2fb5a6'
    };

    var speedData = {
      labels: dataLabel,
      datasets: [dataFirst, dataSecond]
    };

    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    var chartOptions = {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 80,
          fontColor: 'white'
        },

        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              fixedStepSize: 1
            }
          }]
         
        }

      }

    } as ChartOptions;

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      data: speedData,
      options: chartOptions
    });

    this.cargando = false;
  }

  calculateDateRange() {
    const date = new Date(this.viewDate);
    const startDay = date.getDate() - date.getDay();
    const lastDay = startDay + 6;
    this.startDate = new Date(date.setDate(startDay));
    this.endDate = new Date(date.setDate(lastDay));
    this.getCount();
  }



}
