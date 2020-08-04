import { environment } from './../../../environments/environment';
import { Template } from './../../models/Template';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AppConfig } from '../../app.config';
import { EmailNotification } from '../../models/EmailNotication';
import { TextMessageNotification } from '../../models/TextMessageNotification';
import { TemplateContent } from '../../models/TemplateContent';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  public templates: Template[];
  public updateTemplates: EventEmitter<Template[]> = new EventEmitter();

  constructor(private http: HttpClient, private appConfig: AppConfig) {
    if (!this.templates) {
      this.getEmailTemplates().subscribe((templates: Template[]) => {
        this.templates = templates;
        this.updateTemplates.emit(this.templates);
      });
    }
  }


  ////////////////////////////////////////////
  //   Templates
  ////////////////////////////////////////////
  getTextMessageTemplates() {
    return this.http.get<Template[]>(`${environment.api}Templates/get-all?channelType=Text Message`)
      .pipe(
        map((resp: any) => {
          resp.results.forEach((template: Template) => {
            template.templateContent.forEach((tCont: TemplateContent) => {
              tCont.contentText = this.decodeHTMLEntities(tCont.contentText);
            });
          });
          return resp;
        }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Templates',
            text: err.message
          });
          return [];
        })
      );
  }

  getEmailTemplates() {
    return this.http.get<Template[]>(`${environment.api}Templates/get-all?channelType=Email`)
      .pipe(
        map((resp: any) => {
          resp.results.forEach((template: Template) => {
            template.templateContent.forEach((tCont: TemplateContent) => {
              tCont.contentText = this.decodeHTMLEntities(tCont.contentText);
            });
          });
          return resp;
        }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Templates',
            text: err.message
          });
          return [];
        })
      );
  }

  deleteTemplate(template: Template) {
    return this.http.post<Template>(`${environment.api}Templates/delete/`, template)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when deleting a Template',
            text: err.message
          });
          return [];
        })
      );
    }

  createTemplate(template: Template) {
    return this.http.post<Template>(`${environment.api}Templates/create/`, template)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Template',
            text: err.message
          });
          return [];
        })
      );
  }

  updateTemplate(template: Template) {
    return this.http.post<Template>(`${environment.api}Templates/update/`, template)
      .pipe(
        catchError(err => {
          console.log('Error', err);
          Swal.fire({
            icon: 'error',
            title: 'Error when updating a Template',
            text: err.message
          });
          return [];
        })
      );
  }

  generatePreview(template: Template) {
    return this.http.post<Template>(`${environment.api}Templates/generate-preview`, template)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Generating Preview of Template',
            text: err.message
          });
          return [];
        })
      );
  }

  sendEmail(email: EmailNotification) {
    return this.http.post<any>(`${environment.api}CustomerNotifications/send-mail`, email)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Sending Email',
            text: err.message
          });
          return [];
        })
      );
  }

  sendTextMessage(textMessage: TextMessageNotification) {
    return this.http.post<any>(`${environment.api}Notification`, textMessage)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Sending Email',
            text: err.message
          });
          return [];
        })
      );
  }

  setIncrementEmail(customerId: number) {
    return this.http.get<any>(`${environment.api}Customers/set-increment-email?customerId=${customerId}`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Incrementing Email',
            text: err.message
          });
          return [];
        })
      );
  }

  setIncrementCall(customerId: number) {
    return this.http.get<any>(`${environment.api}Customers/set-increment-call?customerId=${customerId}`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when Incrementing Call',
            text: err.message
          });
          return [];
        })
      );
  }

  decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  redirectCall(phoneNumber: string){
    window.open('tel://' + phoneNumber);
  }
}
