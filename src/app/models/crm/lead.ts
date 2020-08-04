import { Employee } from '../Employee';
import { Appointment } from './Appointment';
import { LeadAttributeValue } from './LeadAttributeValue';
import { Workflow } from '../workflow/Workflow';
import { LeadStep } from './LeadStep';
import { Customer } from './Customer';
import { Employeelead } from '../EmployeeLead';
import { LeadStatus } from '../leadStatus';


export class LeadProduct {
  active: boolean;
  productInvId: number;
  public leadId: number;
  public workflowId: number;
}


export class Lead {

  public leadId: number;
  public workflowId: number;
  public mainCustomerId: number;
  public sourceName: string;
  public creationDate: Date;
  public employeeId: number;
  public status: string;
  public leadStatusId: number;
  public shortStatus: string;
  public leadProducts: LeadProduct[];
  public count: number;
  public closeDate?: Date;
  public _1stVisitDate?: Date;
  public signingDate?: Date;
  public lastContactDate?: Date;
  public storeId: number;

  public mainCustomer: Customer;
  public employee: Employee;
  public workflow: Workflow;
  public appointment: Appointment[];
  public leadAttributeValue: LeadAttributeValue[];
  public employeeLead: Employeelead[];
  public leadSteps: LeadStep[];
  public leadStatus: LeadStatus;
  public leadProgressInfo: any;

  constructor() {

  }
}
