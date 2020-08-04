import { Workflow } from './Workflow';
import { Module } from '../Module';

export class WorkflowModule {
  public workflowId: number;
  public moduleId: number;

  public workflow: Workflow;
  public module: Module;

  constructor() {}
}
