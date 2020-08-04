import { Lead } from './../crm/lead';
import { Step } from './Step';
import { Module } from '../Module';
import { GroupStepOverview } from './GroupStepOverview';
import { WorkflowModule } from './WorkflowModule';

export class Workflow {
  public workflowId: number;
  public active: boolean;
  public name: string;
  public description: string;
  public moduleId: number;

  public module: Module[];
  // public steps: Step[];
  public windowsWidth: number;
  public groupStepOverview: GroupStepOverview[];
  public lead: Lead[];
  public workflowModule: WorkflowModule[];

  constructor() {
  }


}
