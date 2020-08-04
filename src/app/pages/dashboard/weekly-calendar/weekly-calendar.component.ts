import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  MatDialog } from '@angular/material/dialog';
import {  ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import {
  CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTitleFormatter
} from 'angular-calendar';
import { CalendarService, UserService } from '../../../services/service.index';
import { Appointment } from '../../../models/crm/Appointment';
import { CustomEventTitleFormatter } from '../../apps/aosp/calendar/custom-event-title-formatter.provider';
import { AppConfig } from '../../../app.config';


@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ]
})
export class WeeklyCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;
  viewDate: Date;

  selectedEvent: CalendarEvent;
  eventActive: boolean;
  newEvent: boolean;

  selectedStartDate: string;
  selectedEndDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  selectedTitle: string;

  actions: CalendarEventAction[];

  refresh: Subject<any>;
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean;
  cargando: boolean = true;

  constructor(
    public datepipe: DatePipe, private cService: CalendarService, private usrService: UserService,
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
    this.selectedEndTime = '';}

  ngOnInit() {
  }

  editOnRightMenu(event: CalendarEvent) {
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(event.meta.appointment); });
  }

  updateEvents() {

    this.cargando = true;

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
    this.cargando = false;
  }

}
