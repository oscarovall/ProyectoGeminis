import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../app.config';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleveriesService {

  constructor(
    public http: HttpClient, public config: AppConfig) { }


  deliverys() {
    const url = environment.api + 'Leads/count-pending-deliveries-this-week?EmployeeId=3';

    return this.http.get(url)

      .pipe(
        catchError((err: any) => {
          console.log(err);
          return [];
        })
      );
  }
}
