import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Store } from '../../models/Store';
import { AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }


  ////////////////////////////////////////////
  //   STORES
  ////////////////////////////////////////////
  getStores() {
    return this.http.get<Store[]>(`${environment.api}Stores`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Stores',
            text: err.message
          });
          return [];
        })
      );
  }
}
