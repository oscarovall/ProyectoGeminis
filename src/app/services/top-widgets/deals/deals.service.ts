import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../app.config';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(
    public http: HttpClient, public config: AppConfig) { }

  deals() {
    const url = environment.api + 'Leads/count-deals-by-status?EmployeeId=3';

    return this.http.get(url)

      .pipe(
        catchError((err: any) => {
          console.log(err);
          return [];
        })
      );
  }
}
