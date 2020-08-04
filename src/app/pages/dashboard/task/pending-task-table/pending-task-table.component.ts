import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Appointment } from '../../../../models/crm/Appointment';
import { AppConfig } from '../../../../app.config';
import { UserService } from '../../../../services/user/user.service';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { CloseTaskDialogComponent } from '../../../../layout/components/close-task-dialog/close-task-dialog.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-pending-task-table',
  templateUrl: './pending-task-table.component.html',
  styleUrls: ['./pending-task-table.component.css']
})
export class PendingTaskTableComponent implements OnInit {

  totalPages;
  pageSize;
  pendingTasks: Appointment[];
  totalDueTasks = 0;
  totalPendingTasks = 0;
  today = new Date();
  cargando: boolean = true;
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private appConfig: AppConfig,
    private usrService: UserService,
    private cService: CalendarService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.getPendingTasks();
    this.cService.allEventsChanged.subscribe((selectedEvent: Appointment) => this.getPendingTasks());
  }

  ngOnInit() {
  }

  addTask(): void {
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(null); });
    setTimeout(() => { this.cService.setSelectedCustomer(null); });
  }

  getPendingTasks() {
    this.cargando = true;
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.dashboardService.getPendingTask(id).subscribe((results) => {
      this.pendingTasks = results.todoTasksList;
      this.totalDueTasks = results.totalDueTasks;
      this.totalPendingTasks = results.totalPendingTasks;
      this.cargando = false;
    });
  }

  editOnRightMenu(appointment: Appointment) {
    const newAppointmet = appointment;
    appointment.endDate = new Date(appointment.endDate);
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(newAppointmet); });
    setTimeout(() => { this.cService.setSelectedCustomer(appointment.customer); });
  }

  checkTask(taskChecked: Appointment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '368px';
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    const dialogRef = this.dialog.open(CloseTaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(comment => {
      if (comment) {
        taskChecked.closeDate = new Date();
        taskChecked.closeComment = comment;
        taskChecked.open = false;
        this.cService.updateEvent(taskChecked).subscribe(task => {
          this.pendingTasks = this.pendingTasks.filter(ev => ev.appointmentId !== taskChecked.appointmentId);
          this.sendNotification('Event closed');
        });
      }
    });
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }
}
