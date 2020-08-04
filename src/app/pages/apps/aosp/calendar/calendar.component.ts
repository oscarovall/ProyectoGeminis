import { MatSnackBar } from '@angular/material/snack-bar';
import { CloseTaskDialogComponent } from './../../../../layout/components/close-task-dialog/close-task-dialog.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarEventTitleFormatter
} from 'angular-calendar';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { Appointment } from '../../../../models/crm/Appointment';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { AppConfig } from '../../../../app.config';
import { UserService } from '../../../../services/service.index';
import { Router } from '@angular/router';


const COLORS: any = {
  red: {
    primary: '#f3655a',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#5aaef3',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#d7a319',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  styles: []
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  viewDate: Date;

  selectedEvent: CalendarEvent;
  eventActive: boolean;
  newEvent: boolean;

  selectedStartDate: string;
  selectedEndDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  selectedTitle: string;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[];

  refresh: Subject<any>;
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean;


  constructor(public datepipe: DatePipe, private cService: CalendarService, private usrService: UserService,
    public appConfig: AppConfig, public dialog: MatDialog, private _snackBar: MatSnackBar,
    private router: Router) {
    this.actions = [
      {
        label: '<i class="fa fa-fw fa-pencil ml-3"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.editOnRightMenu(event);
        },
      },
      {
        label: '<i class="fa fa-fw fa-check ml-2"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.checkTask(event.meta.appointment);
        }
      }
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
    this.selectedEndTime = '';
  }

  editOnRightMenu(event: CalendarEvent) {
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(event.meta.appointment); });
  }

  updateEvents() {
    // console.log('Update events', this.cService.allEvents);
    this.events = [];
    this.cService.allEvents.forEach((appointment: Appointment) => {
      const event = {
        start:
        (appointment.appointmentTypeId === this.appConfig.appointmentType.appointment) ? appointment.startDate :
        (appointment.appointmentTypeId === this.appConfig.appointmentType.pendingTask) ? appointment.endDate : appointment.endDate,
        end: appointment.endDate,
        title: appointment.title,
        color:
          (appointment.appointmentTypeId === this.appConfig.appointmentType.appointment) ? COLORS.red :
            (appointment.appointmentTypeId === this.appConfig.appointmentType.pendingTask) ? COLORS.blue : COLORS.yellow,
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  // eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
  //   event.start = newStart;
  //   event.end = newEnd;
  //   this.handleEvent(event);
  //   this.refresh.next();
  // }

  // handleEvent(event: CalendarEvent): void {
  //   this.selectedEvent = event;
  //   this.selectedTitle = event.title;
  //   this.selectedStartDate = this.datepipe.transform(event.start, 'yyyy/MM/dd');
  //   this.selectedEndDate = this.datepipe.transform(event.end, 'yyyy/MM/dd');
  //   this.selectedStartTime = this.datepipe.transform(event.start, 'hh:hh');
  //   this.selectedEndTime = this.datepipe.transform(event.end, 'hh:mm');
  //   this.eventActive = true;
  // }

  // saveEvent(): void {
  //   this.events.forEach((event: CalendarEvent) => {
  //     if (event === this.selectedEvent) {
  //       this.saveData(event);
  //     }
  //   });
  //   this.refresh.next();
  //   this.eventActive = false;
  // }

  // saveData(event: CalendarEvent): void {
  //   event.title = this.selectedTitle;
  //   event.start = new Date(this.selectedStartDate + ' ' + this.selectedStartTime);
  //   event.end = new Date(this.selectedEndDate + ' ' + this.selectedEndTime);
  // }

  // deleteEvent(): void {
  //   this.events.forEach((event: CalendarEvent) => {
  //     if (event === this.selectedEvent) {
  //       this.events = this.events.filter(iEvent => iEvent !== event);
  //     }
  //   });
  //   this.eventActive = false;
  // }

  // closeEventAction(): void {
  //   this.eventActive = false;
  //   this.selectedEvent = {
  //     start: new Date(),
  //     title: '',
  //   };
  //   this.selectedEndDate = '';
  //   this.selectedStartDate = '';
  //   this.selectedTitle = '';
  // }

  addEvent(): void {
    // this.events.push({
    //   title: this.selectedTitle,
    //   start: new Date(this.selectedStartDate + ' ' + this.selectedStartTime),
    //   end: new Date(this.selectedEndDate + ' ' + this.selectedEndTime),
    //   color: COLORS.red,
    // });
    // this.refresh.next();
    // this.newEvent = false;
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(null); });
    setTimeout(() => { this.cService.setSelectedCustomer(null); });
  }

  checkTask(taskChecked: Appointment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '368px';
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    const dialogRef = this.dialog.open(CloseTaskDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(comment => {
      if (comment) {
        taskChecked.closeDate = new Date();
        taskChecked.closeComment = comment;
        taskChecked.open = false;
        this.cService.updateEvent(taskChecked).subscribe(task => {
          this.sendNotification('Event closed');
        });
      }
    });
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  close() {
    this.router.navigate(['/dashboard']);
  }
}
