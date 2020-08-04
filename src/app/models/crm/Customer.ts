import { CustomerAttributeValue } from './CustomerAttributeValue';
import { Lead } from './lead';
import { CustomerStatus } from './CustomerStatus';
import { Employee } from '../Employee';


export class Customer {

  public customerId: number;
  public name: string;
  public lastname: string;
  public email: string;
  public mobileNum: string;
  public phoneNumber: string;
  public sourceName: string;
  public creationDate: Date;
  public lastContactDate: Date;
  public employeeId: number;
  public notes: string;
  public customerStatusId: number;

  public lead: Lead[];
  public customerStatus: CustomerStatus;
  public customerAttributeValue: CustomerAttributeValue[];
  public employee: Employee;

  constructor() {}
}
