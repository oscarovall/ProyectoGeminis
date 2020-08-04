import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Store } from '../../models/Store';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }

  getPendingTask(employeeId) {
    const url = `${environment.api}PendingTask/get-pending-tasks-by-employee?EmployeeId=${employeeId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Pending Task',
            text: err.message
          });
          return [];
        })
      );
  }

  countPendingTask(employeeId) {
    const url = `${environment.api}PendingTask/count-pending-tasks-by-team?TeamOwnerId=${employeeId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Pending Task',
            text: err.message
          });
          return [];
        })
      );
  }

  getStores() {
    const url = `${environment.api}Stores/get-all`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Stores',
            text: err.message
          });
          return [];
        })
      );
  }

  getSources() {
    const url = `${environment.api}Sources/get-all`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Sources',
            text: err.message
          });
          return [];
        })
      );
  }

  getWeeklyMetrics(employeeId, startDate, endDate, includeTM) {
    const url = `${environment.api}WeeklyMetrics/get-weekly-metrics?EmployeeId=${employeeId}&ChangeDateStartsAt=${startDate}&ChangeDateEndsAt=${endDate}&IncludeTeamMembers=${includeTM}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Sources',
            text: err.message
          });
          return [];
        })
      );
  }
}




