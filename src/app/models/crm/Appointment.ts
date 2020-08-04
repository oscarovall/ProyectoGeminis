import { Lead } from './lead';
import { AppointmentEmployee } from './AppoinmentEmployee';
import { Customer } from './Customer';

export class Appointment {

  public appointmentId: number;
  public title: string = '';
  public startDate: Date;
  public endDate: Date;
  public identifier: string;
  public description: string;
  public due: boolean = false;
  public priority: boolean = false;
  public channelType: string;
  public leadId: number;
  public workflowId: number;
  public creationDate: Date;
  public appointmentTypeId: string;
  public open: boolean;
  public manual: boolean = true;
  public closeDate: Date;
  public closeComment: string;
  public employeeId: number;
  public createdById: number;

  public lead: Lead;
  public appointmentEmployee: AppointmentEmployee[];
  public customer: Customer;

  constructor(endDate: Date, channelType: string, appointmentTypeId: string) {
    this.endDate = endDate;
    this.channelType = channelType;
    this.appointmentTypeId = appointmentTypeId;
  }
}
