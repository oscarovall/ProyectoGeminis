import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GraphAppointmentsService {

  constructor(
    public http: HttpClient,
    private config: AppConfig) { }

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
}
