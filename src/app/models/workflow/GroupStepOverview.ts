import { Step } from './Step';


export class GroupStepOverview {
  public groupId: number;
  public name: string;
  public position: number;
  public deadline: number;
  public workflowId: number;
  public step: Step[];

  public height: number = 100;
  public selected: boolean = false;

  // UI status
  public statusLead: string = 'Next';

  constructor() { }
}
