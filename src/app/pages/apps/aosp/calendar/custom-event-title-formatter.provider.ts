import { Lead } from './../../../../models/crm/Lead';

import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { AppConfig } from '../../../../app.config';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string, private appConfig: AppConfig) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    console.log('Event', event.meta.appointment);

    let type = '';
    if (event.meta.appointment.appointmentTypeId === this.appConfig.appointmentType.appointment) {
      type = `  <span class="title-event event-app">Appointment</span>`;
      type = `${type}  ${new DatePipe(this.locale).transform(event.start, 'MMM d, hh:mm a', this.locale)} -
      ${new DatePipe(this.locale).transform(event.end, 'MMM d, hh:mm a', this.locale)}`;
    } else if (event.meta.appointment.appointmentTypeId === this.appConfig.appointmentType.pendingTask) {
      type = `  <span class="title-event event-todo">To Do Task</span>`;
      type = `${type}  ${new DatePipe(this.locale).transform(event.end, 'MMM d, hh:mm a', this.locale)}`;
    } else if (event.meta.appointment.appointmentTypeId === this.appConfig.appointmentType.reminder) {
      type = `  <span class="title-event event-reminder">Reminder</span>`;
      type = `${type}  ${new DatePipe(this.locale).transform(event.end, 'MMM d, hh:mm a', this.locale)}`;
    }

    let isLead = '';
    if (event.meta.appointment.Lead) {
      isLead = `|  <a href="/lead/${event.meta.appointment.Lead.leadId}">
      ${event.meta.appointment.Lead.mainCustomer.name} ${event.meta.appointment.Lead.mainCustomer.lastname}</a>`;
    }

    return `${type}  |  <span>${event.title}</span>  ${isLead}`;
  }

  week(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'h:m a',
      this.locale
    )}</b> ${event.title}`;
  }

  day(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'h:m a',
      this.locale
    )}</b> ${event.title}`;
  }


}
