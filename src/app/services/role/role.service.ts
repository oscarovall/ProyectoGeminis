import { Injectable, EventEmitter } from '@angular/core';
import { AppConfig } from './../../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { RolePage } from '../../models/RolePage';
import { Role } from '../../models/Role';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }

  getPages() {
    return this.http.get<RolePage[]>(environment.api + 'RolePages')
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Pages',
            text: err.message
          });
          return [];
        })
      );
  }

  getRolePermission() {
    return this.http.get<RolePage[]>(environment.api + 'RolePermission')
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting RolePermissions',
            text: err.message
          });
          return [];
        })
      );
  }
}
