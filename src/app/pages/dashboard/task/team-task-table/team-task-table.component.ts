import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Appointment } from '../../../../models/crm/Appointment';
import { AppConfig } from '../../../../app.config';
import { UserService } from '../../../../services/user/user.service';
import { CalendarService } from '../../../../services/calendar/calendar.service';

@Component({
  selector: 'app-team-task-table',
  templateUrl: './team-task-table.component.html',
  styleUrls: ['./team-task-table.component.css']
})
export class TeamTaskTableComponent implements OnInit {

  teamTasks;
  cargando: boolean = true;
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private appConfig: AppConfig,
    private usrService: UserService,
    private cService: CalendarService) {
    this.getTeamTasks();
    this.cService.allEventsChanged.subscribe((selectedEvent: Appointment) => this.getTeamTasks());
  }

  ngOnInit() {
  }

  addTask(): void {
    this.usrService.showRightMenu(this.appConfig.rightMenu.calendar);
    setTimeout(() => { this.cService.setSelectedEvent(null); });
    setTimeout(() => { this.cService.setSelectedCustomer(null); });
  }

  getTeamTasks() {
    this.cargando = true;
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.dashboardService.countPendingTask(id).subscribe((response) => {
      this.teamTasks = response.results;
      this.cargando = false;
    });
  }

}
