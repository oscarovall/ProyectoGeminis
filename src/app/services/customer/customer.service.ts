import { environment } from './../../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Customer } from '../../models/crm/Customer';
import { Lead } from '../../models/crm/lead';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // Customer-edit
  public selectedCustomer: Customer;  
  public selectedCustomerChanged: EventEmitter<Customer> = new EventEmitter<Customer>();  
  public selectedCustomerSaved: EventEmitter<Customer> = new EventEmitter<Customer>();

  // Lead
  public selectedLead: Lead;
  public selectedLeadChanged: EventEmitter<Lead> = new EventEmitter<Lead>();

  constructor(
    private http: HttpClient,
  ) { }

  ////////////////////////////////////////////
  ///           Customer-edit              ///
  ////////////////////////////////////////////
  setSelectedCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.selectedCustomerChanged.emit(this.selectedCustomer);
  }
  setSelectedLead(lead: Lead) {
    this.selectedLead = lead;
    this.selectedLeadChanged.emit(this.selectedLead);
  }
  saveDoneCustomer(customer: Customer) {
    this.selectedCustomerSaved.emit(this.selectedCustomer);
  }

  getCustomersByTeamMember(teamMemberId: number, pageSize: number, currentPage: number, statusId: number, filterWords: Array<string>) {
    let SearchKeywords = '';
    if (filterWords) {
      filterWords.forEach(word => {
        SearchKeywords = SearchKeywords + `&SearchKeywords=${word}`;
      });
    }
    const status = (statusId || statusId === 0 ) ? `&StatusId=${statusId}` : '';
    const data = `Id=${teamMemberId}&PageSize=${pageSize}&CurrentPage=${currentPage}${status}${SearchKeywords}`;
    const url = `${environment.api}Customers/get-customers-by-team-member?${data}`;
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

  getCustomerStatus() {
    const url = `${environment.api}Customers/get-customerstatus`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Customer Status',
            text: err.message
          });
          return [];
        })
      );
  }

  updateCustomer(customer: Customer) {
    const url = `${environment.api}Customers/${customer.customerId}`;
    return this.http.put<any>(url, customer)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Updating Customer',
            text: err.message
          });
          return [];
        })
      );
  }
}
