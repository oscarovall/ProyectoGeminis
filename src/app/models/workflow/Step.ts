import { StepType } from './StepType';
import { Class } from '../Class';
import { AttributeType } from '../AttributeType';
import { Attribute } from '../Attribute';
import { StepPredecesors } from './StepPredecesors';
import { StepClasses } from './StepClasses';
import { Role } from '../Role';

export class Step {
  public stepId: number;
  public name: string;
  public roleId: number;
  public stepTypeId: number;
  public groupId: number;
  public stepType?: StepType;
  public templateId: number;
  public deadline: number;
  public taskContent: string;
  public leadStatus: number;

  public role: Role;
  public stepPredecesorsStepChild: StepPredecesors[];
  public stepPredecesorsStepFather: StepPredecesors[];
  public stepClasses: StepClasses[];

  // Configuration
  public attributeTypeId: number;
  public mainValueId: number;
  public secondaryValueId: number;

  public attributeType: AttributeType;
  public mainValue: Attribute;
  public secondaryValue: Attribute;

  // UI
  public selected: boolean = false;
  public selectedRight: boolean = false;

  // UI Workflow Page
  public x: number;
  public y: number;
  public position: any;
  public stepLevel: number;

  // UI Connector
  public levelFatherCondition: number;
  public levelFatherLeft: number;
  public levelFatherRight: number;

  constructor(name: string, stepTypeId: number, stepLevel: number, position: number, groupId: number) {
    this.name = name;
    this.stepTypeId = stepTypeId;
    this.stepLevel = stepLevel;
    this.position = position;
    this.groupId = groupId;
    this.stepClasses = [];
  }
}
