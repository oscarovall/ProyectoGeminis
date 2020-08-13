import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { AppConfig } from '../../app.config';
import { Class } from '../../models/Class';
import { LeadStep } from '../../models/crm/LeadStep';
import { Lead } from '../../models/crm/Lead';
import { Auth, API } from 'aws-amplify';
import { AuthService } from '../auth/auth.service';
import { LeadStatus } from '../../models/leadStatus';
import { environment } from '../../../environments/environment';
import { Customer } from '../../models/crm/Customer';
import { HomesOrderInput } from '../../models/crm/HomesOrderInput';
import { Employeelead } from '../../models/EmployeeLead';
import { ProdOption } from '../../models/crm/ProdOption';




@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  ClassCustomerlead: any[] = [];
  leadSteps: LeadStep[];
  LeadStatus: LeadStatus[];
  leadStepsChanges: EventEmitter<LeadStep[]> = new EventEmitter<LeadStep[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: AppConfig, private authService: AuthService) { }

  ////////////////////////////////////////////
  //   LEADS
  ////////////////////////////////////////////
  getLeadSteps() {
    return this.http.get<LeadStep[]>(environment.api + 'LeadSteps') // Must be create interface for ClassCustomer
      .pipe(
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Leads',
            text: err.message
          });
          return [];
        })
      );
  }

  createLead(lead: Lead) {
    return this.http.post<Lead>(`${environment.api}Leads`, lead)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Lead',
            text: err.message
          });
          return [];
        })
      );
  }

  getLead(leadId: number) {
    // const session = JSON.parse(localStorage.getItem('user'));
    // console.log('session', session);
    // let jwt = session.signInUserSession.accessToken.jwtToken;
    // console.log(`myJwt: ${jwt}`);
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', `application/json`);
    // reqHeader.append('Authorization', `Bearer ${jwt}`);

    return this.http
      .get<Lead>(environment.api + `Leads/${leadId}`, { headers: reqHeader }) // Must be create interface for ClassCustomer
      .pipe(
        map((lead: Lead) => {
          this.leadSteps = lead.leadSteps;
          if (lead._1stVisitDate) {
            lead._1stVisitDate = new Date(lead._1stVisitDate);
          }
          if (lead.closeDate) {
            lead.closeDate = new Date(lead.closeDate);
          }
          if (lead.signingDate) {
            lead.signingDate = new Date(lead.signingDate);
          }
          if (lead.lastContactDate) {
            lead.lastContactDate = new Date(lead.lastContactDate);
          }
          if (lead.creationDate) {
            lead.creationDate = new Date(lead.creationDate);
          }

          console.log('Service Lead', lead);
          return lead;
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when getting a Lead',
            text: err.message
          });
          return [];
        })
      );
  }

  getClassCustomerLead() {
    return this.http
      .get<Class[]>(environment.api + 'Classes/ClassCustomerLead') // Must be create interface for ClassCustomer
      .pipe(
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Workflows',
            text: err.message
          });
          return [];
        })
      );
  }

  updateLeadAttValues(IdattValues: number, classObj: Class, leadId: number) {
    const url = `${environment.api}Leads/attType/${IdattValues}/${classObj.objectTypeId}`;
    console.log('Update AttTypes:', classObj.changedAttTypes);

    return this.http.put(url, classObj.changedAttTypes)
      .pipe(
        map(() => {
          this.evaluateStep(leadId).subscribe((resp) => {
            console.log('Evaluate', resp);
          });
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when updating a Lead',
            text: err.message
          });
          return [];
        })
      );
  }
  updateLeadBasicInformation(lead: Lead) {
    const url = `${environment.api}Leads/${lead.leadId}`;
    return this.http.put(url, lead).pipe(
      map(() => { }),
      catchError((err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error when updating a Lead',
          text: err.message
        });
        return [];
      })
    );
  }

  evaluateStep(leadId: number) {
    return this.http
      .get<LeadStep[]>(environment.api + `leadSteps/evaluate/${leadId}`) // Must be create interface for ClassCustomer
      .pipe(
        map((leadSteps: LeadStep[]) => {
          this.leadSteps = leadSteps;
          this.leadStepsChanges.emit(this.leadSteps);
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Workflows',
            text: err.message
          });
          return [];
        })
      );
  }

  getLeadByTeamOwner(employeeId: number, pageSize: number, currentPage: number, filterWords: Array<string>) {
    let SearchKeywords = '';
    if (filterWords) {
      filterWords.forEach(word => {
        SearchKeywords = SearchKeywords + `&SearchKeywords=${word}`;
      });
    }
    const data = `id=${employeeId}&PageSize=${pageSize}&CurrentPage=${currentPage}${SearchKeywords}`;
    const url = `${environment.api}Leads/get-leads-by-team-owner/?${data}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all employee - pagination',
            text: err.message
          });
          return [];
        })
      );
  }

  getLeadByTeamMember(employeeId: number, pageSize: number, currentPage: number, filterWords: Array<string>) {
    let SearchKeywords = '';
    if (filterWords) {
      filterWords.forEach(word => {
        SearchKeywords = SearchKeywords + `&SearchKeywords=${word}`;
      });
    }
    const data = `id=${employeeId}&PageSize=${pageSize}&CurrentPage=${currentPage}${SearchKeywords}`;
    const url = `${environment.api}Leads/get-leads-by-team-member/?${data}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all employee - pagination',
            text: err.message
          });
          return [];
        })
      );
  }

  getLeadByStatus(IdStatus: number, pageSize: number, currentPage: number) {
    const url = `${environment.api}Leads/get-lead-status?idStatus=${IdStatus}&CurrentPage=${currentPage}&PageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all employee - pagination',
            text: err.message
          });
          return [];
        })
      );
  }

  getLeadStatus() {
    const url = `${environment.api}LeadStatus`;
    return this.http.get<LeadStatus[]>(url)
      .pipe(
        map((result: any) => {
          return result.results;
        }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all status of leads',
            text: err.message
          });
          return [];
        })
      );
  }

  getTeamMembers(employeeId) {
    const url = `${environment.api}TeamMembers/get-members-by-team-owner?TeamOwnerId=${employeeId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all employee - pagination',
            text: err.message
          });
          return [];
        })
      );
  }

  getCount(EmployeeId: number, IncludeTeamMebers: boolean, EndDateStartsAt, EndDateEndsAt) {
    const url = `${environment.api}Appointments/count-appointments?EmployeeId=${EmployeeId}&IncludeTeamMebers=${IncludeTeamMebers}&EndDateStartsAt=${EndDateStartsAt}&EndDateEndsAt=${EndDateEndsAt}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Appointment',
            text: err.message
          });
          return [];
        })
      );
  }


  //Pending RSO
  getPendingRso(pageSize: number, currentPage: number) {
    const url = `${environment.api}PendingRso/get-page?CurrentPage=${currentPage}&PageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all',
            text: err.message
          });
          return [];
        })
      );
  }

  productInvAvailable() {
    const url = `${environment.api}ProductInv/get-all-available`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all',
            text: err.message
          });
          return [];
        })
      );
  }

  approveRso(leadId: number, workflowId: number, productInvId: number) {
    const approvePendingRso = {
      leadId: leadId,
      workflowId: workflowId,
      productInvId: productInvId
    };

    return this.http.post<any>(`${environment.api}PendingRso/approve`, approvePendingRso)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when generating Approve',
            text: err.message
          });
          return [];
        })
      );

  }


  rejectRso(leadId: number, workflowId: number, productInvId: number, rsoRejectedReason: string) {
    const rejectPendingRso = {
      leadId: leadId,
      workflowId: workflowId,
      productInvId: productInvId,
      rsoRejectedReason: rsoRejectedReason
    };
    return this.http.post<any>(`${environment.api}PendingRso/reject`, rejectPendingRso)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when generating Approve',
            text: err.message
          });
          return [];
        })
      );
  }

  ChangeHomeRso(leadId: number, workflowId: number, productInvId: number) {
    const changeHomePendingRso = {
      leadId: leadId,
      workflowId: workflowId,
      productInvId: productInvId
    };
    return this.http.post<any>(`${environment.api}PendingRso/change-home`, changeHomePendingRso)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when generating Approve',
            text: err.message
          });
          return [];
        })
      );
  }
  //////////////////////////////////////////////


  getLeadsReceived(TeamOwnerId:number, startDate, endDate, sourceName?: string, storeId?: string) {
    const url = `${environment.api}Leads/count-leads-received?TeamOwnerId=${TeamOwnerId}&StoreId=${storeId}&SourceName=${sourceName}&CreationDateStartsAt=${startDate}&CreationDateEndsAt=${endDate}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Leads Received',
            text: err.message
          });
          return [];
        })
      );
  }

  getTotalGrossProfit(TeamOwnerId:number, startDate, endDate, storeId?: string) {
    const url = `${environment.api}Leads/get-total-gross-profit?TeamOwnerId=${TeamOwnerId}&StoreId=${storeId}&CloseDateStartsAt=${startDate}&CloseDateEndsAt=${endDate}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Leads Received',
            text: err.message
          });
          return [];
        })
      );
  }

  getEmployeesLead(leadId: number) {
    return this.http
      .get<Employeelead[]>(environment.api + 'Leads/EmployeesLead/' + leadId)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Employees from Lead',
            text: err.message
          });
          return [];
        })
      );
  }

  ////////////////////////////////////////////
  //   CUSTOMERS
  ////////////////////////////////////////////
  searchCustomer(customer: Customer) {
    const url = `${environment.api}Customers/search-customer`;
    return this.http.put<Customer>(url, customer)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when searching a Customer',
            text: err.message
          });
          return [];
        })
      );
  }

  createCustomer(customer: Customer) {
    const url = `${environment.api}Customers`;
    return this.http.post<Customer>(url, customer)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Customer',
            text: err.message
          });
          return [];
        })
      );
  }

  ////////////////////////////////////////////
  //   HOMES
  ////////////////////////////////////////////
  getHomes(leadId: number, workFlowId: number) {
    const url = `${environment.api}Homes/get-all-by-preferences?leadId=${leadId}&workFlowId=${workFlowId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Leads Received',
            text: err.message
          });
          return [];
        })
      );
  }

  homesOrder(homesOrderInput: HomesOrderInput) {
    const url = `${environment.api}Homes/order`;
    return this.http.post<HomesOrderInput>(url, homesOrderInput)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Orders Homes',
            text: err.message
          });
          return [];
        })
      );
  }

  getOrderHome(productInvId: number) {
    const url = `${environment.api}Homes/get-ordered-home?productInvId=${productInvId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Leads Received',
            text: err.message
          });
          return [];
        })
      );
  }

  getAllOptionsByLead() {
    const url = `${environment.api}LeadProductOptions/get-all-product-options`;
    return this.http.get<any>(url)
      .pipe(
        map((result: any) => {
          return result.results;
        }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Product Options',
            text: err.message
          });
          return [];
        })
      );
  }

}




