import { Component, OnInit, Input } from '@angular/core';
import { Traceability } from '../../../models/crm/Traceability';
import { TraceabilityService } from '../../../services/service.index';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

interface Notifications {
  date: string;
  activity: {
    type: string;
    action: string;
    description1: string;
    description2?: string;
  };
  employee: {
    role: string;
    name?: string;
  };
  action?: any[];
}

@Component({
  selector: 'client-activity',
  templateUrl: './client-activity.component.html',
  styleUrls: ['./client-activity.component.css']
})
export class ClientActivityComponent implements OnInit {
  @Input() leadId: number;
  values: Traceability[];
  notifications: Notifications[] = [];
  allNotifications;
  public page: number = 1;
  pages: Notifications[][];
  public totalPages: number;
  public recordCount: number;
  public pageSize = 5;

  constructor(private traceabilityService: TraceabilityService) { }

  ngOnInit() {
      this.changePage();
  }

  changePage(page?: number) {
    if (page) {
      this.page = page;
    }

    this.traceabilityService.getTraceabilityPaginated(this.pageSize, this.page, this.leadId).subscribe((traceability) => {

      console.log('Traceability', traceability);
      this.totalPages = traceability.pageCount;
      this.recordCount = traceability.recordCount;
      this.values = traceability.results;
      this.notifications = [];
      const datePipe = new DatePipe('en-US');

      this.values.forEach((trace: Traceability) => {
        const date = new Date(trace.date);
        const notification: Notifications = {
          // date: String(date.getMonth()) + ' / ' + String(date.getDate()),
          // hour: String(date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
          //   .toLowerCase()
          //   .replace(' ', ''),
          date: datePipe.transform(trace.date, 'MMM dd yyyy - hh:mm a').toString(),
          activity: {
            type: trace.type,
            action: trace.name,
            description1: trace.description1,
            description2: trace.description2
          },
          employee: {
            role: trace.employee.role.role1,
            name: trace.employee.name
          }
        };
        this.notifications.push(notification);
      });
    });
  }

  executeAction(event) {
    //    console.log('Action', event);
  }
}
