import { Employee } from '../Employee';

export class Traceability {
  public traceabilityId: number;
  public name: string;
  public description1: string;
  public type: string;
  public employeeID: number;
  public leadId: number;
  public workflowId: number;
  public date: Date;
  public description2?: string;

  public employee: Employee;
}
