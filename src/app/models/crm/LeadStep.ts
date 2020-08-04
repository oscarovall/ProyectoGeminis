import { Lead } from './lead';
import { Step } from '../workflow/Step';
export class LeadStep {

  public leadId: number;
  public workflowId: number;
  public startDate: Date;
  public statusName: string;

  public lead: Lead;
  public step: Step;
  constructor() {}
}
