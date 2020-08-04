import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from './../../../../models/Employee';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Appointment } from '../../../../models/crm/Appointment';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CloseTaskDialogComponent } from '../../close-task-dialog/close-task-dialog.component';
import { AppConfig } from '../../../../app.config';
import { MatTabGroup } from '@angular/material';
import { TasksDuePipe } from '../../../../ui/pipes/tasks-due.pipe';
import { AuthService, CalendarService, UserService } from '../../../../services/service.index';
import { Customer } from '../../../../models/crm/Customer';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('tasksgroup', null) tabGroup: MatTabGroup;
  // bsInlineValue = new Date();
  today: Date = new Date();
  employeeId: number;

  // TABS
  pendingTasks: Appointment[];
  dueTasks: Appointment[];
  appointments: Appointment[];

  // UI
  calendarOpened = false;

  constructor(
    public calendarService: CalendarService, private userService: UserService, public appConfig: AppConfig,
    public router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef, private tasksDue: TasksDuePipe,
    private authService: AuthService
  ) {
    this.employeeId = this.getEmployeeId();
    this.calendarService.selectedEventChanged.subscribe((selectedEvent: Appointment) => this.openSelected(selectedEvent));
    this.calendarService.allEventsChanged.subscribe((selectedEvent: Appointment) => this.onChangeCal(this.today));
  }

  ngOnInit() {
    this.onChangeCal(this.today);
  }

  onChangeCal(event: Date) {
    this.pendingTasks = this.calendarService.allEvents; // this.tasksDue.transform(this.calendarService.allEvents, false, event);
 

    this.dueTasks = this.tasksDue.transform(this.calendarService.allEvents, true, event);

  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  redirect(url: string) {
    this.userService.hideRightMenu();
    this.router.navigateByUrl(url);
  }

  openCalendar() {
    this.calendarOpened = !this.calendarOpened;
  }

  showDisplay() {
    // this.selectedEvent = null;
    this.calendarService.setSelectedEvent(null);
    this.calendarService.setSelectedCustomer(null);
  }

  hideDisplay() {
    this.calendarService.displayCreationForm = true;
  }

  getEmployeeId() {
    const employee: Employee = this.authService.getUser();
    return employee.employeeId;
  }

  editTask(event: Appointment) {
    this.calendarService.setSelectedEvent(event);
    
    if (event.lead && event.lead.mainCustomer) {
      this.calendarService.setSelectedCustomer(event.lead.mainCustomer);
    } else {
      this.calendarService.setSelectedCustomer(null);
    }
  }

  openSelected(selectedEvent: Appointment) {
    this.calendarService.displayCreationForm = false;
    // setTimeout(() => { console.log('TabGroup2', this.tabGroup); });
    this.changeDetectorRef.detectChanges();
    // console.log('TabGroup', this.tabGroup);

    if (selectedEvent) {
      if (selectedEvent.appointmentTypeId === this.appConfig.appointmentType.pendingTask) {
        this.tabGroup.selectedIndex = 0;
      } else if (selectedEvent.appointmentTypeId === this.appConfig.appointmentType.appointment) {
        this.tabGroup.selectedIndex = 1;
      } else if (selectedEvent.appointmentTypeId === this.appConfig.appointmentType.reminder) {
        this.tabGroup.selectedIndex = 2;
      }
    } else {
      this.tabGroup.selectedIndex = 0;
    }
  }

  checkTask(taskChecked: Appointment) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '368px';
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    const dialogRef = this.dialog.open(CloseTaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(comment => {
      // console.log('The dialog was closed', comment);
      if (comment) {
        taskChecked.closeDate = new Date();
        taskChecked.closeComment = comment;
        taskChecked.open = false;
        this.calendarService.updateEvent(taskChecked).subscribe(task => {
          this.sendNotification('Event closed');
        });
      }
    });
  }
}

