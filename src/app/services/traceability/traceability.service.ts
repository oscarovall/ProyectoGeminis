import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import Swal from 'sweetalert2';
import { Traceability } from '../../models/crm/Traceability';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TraceabilityService {
  constructor(private http: HttpClient, private router: Router, private config: AppConfig) { }

  saveClassChange(traceability: Traceability) {
    const url = `${environment.api}Traceabilities/`;
    return this.http.post(url, traceability);
  }
  // GET all the Traceability
  getTraceability() {
    const url = `${environment.api}Traceabilities/`;
    return this.http.get<Traceability[]>(environment.api + `Traceabilities/`).pipe(
      catchError((err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error when getting Traceability',
          text: err.message
        });
        return [];
      })
    );
  }

  // GET all the Traceability
  getTraceabilityPaginated(pageSize: number, page: number, leadId: number) {
    const url = `${environment.api}Traceabilities/get-traceability-lead?LeadId=${leadId}&PageSize=${pageSize}&CurrentPage=${page}`;
    return this.http.get<Traceability[]>(url).pipe(
      catchError((err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error when getting Traceability Pag',
          text: err.message
        });
        return [];
      })
    );
  }
}
