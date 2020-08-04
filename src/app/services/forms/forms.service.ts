import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Template } from '../../models/Template';
import { LeadDocument } from '../../models/crm/LeadDocument';



@Injectable({
  providedIn: 'root'
})
export class FormsService {

  public templates: Template[];
  public leadDocument: LeadDocument[];

  constructor(public http: HttpClient,
    private config: AppConfig) { }

  getAllForms() {
    const url = environment.api + 'LeadDocuments/get-all';
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

  getAllDocCategory() {
    const url = environment.api + 'DocCategories/get-all';
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

  getAllAttributeTypes() {
    const url = environment.api + 'AttributeTypes';
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

  createForm(leadDocument: any) {
    return this.http.post<any>(`${environment.api}LeadDocuments/save`, leadDocument)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Document',
            text: err.message
          });
          return [];
        })
      );
  }

  deleteForm(leadDocumentId: number) {
    return this.http.post<LeadDocument>(`${environment.api}LeadDocuments/delete`, { leadDocumentId: leadDocumentId})
      .pipe(

        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Document',
            text: err.message
          });
          return [];
        })
      );
  }

  uploadFiles(formData: FormData) {
    return this.http.post<LeadDocument>(`${environment.api}LeadDocuments/upload-form-file`, formData)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Document',
            text: err.message
          });
          return [];
        })
      );
  }

  generateFilledForm(leadId: number, workflowId: number, leadDocumentId: number) {
    const infoDocument = {
      leadId: leadId,
      workflowId: workflowId,
      leadDocumentId: leadDocumentId
    };

    return this.http.post<any>(`${environment.api}Forms/fill`, infoDocument)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when generating a Document',
            text: err.message
          });
          return [];
        })
      );
  }


}


