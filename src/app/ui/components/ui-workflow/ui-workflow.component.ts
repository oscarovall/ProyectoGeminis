import { Component, OnInit, Input, ElementRef, ViewChild, SimpleChange } from '@angular/core';
import { Workflow } from '../../../models/workflow/Workflow';
import { fromEvent } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Step } from '../../../models/workflow/Step';
import { GroupStepOverview } from '../../../models/workflow/GroupStepOverview';
import { StepPredecesors } from '../../../models/workflow/StepPredecesors';
import { WorkflowService } from '../../../services/service.index';

@Component({
  selector: 'app-ui-workflow',
  templateUrl: './ui-workflow.component.html',
  styleUrls: ['./ui-workflow.component.css']
})
export class UiWorkflowComponent implements OnInit {

  public windowsWidth: number;
  public positionXTitles: number;
  public workflow: Workflow;
  stepWidth = 220;
  stepHeight = 120;
  margin = 10;

  activeWorkFlow: number;

  @ViewChild('workflowSVG', { static: true }) workflowSVG: ElementRef;

  constructor(private workflowService: WorkflowService) {
    this.workflow = workflowService.selectedWorkflow;
  }

  ngOnInit() {
    this.windowsWidth = $('#workflowSVG').width();
    this.positionXTitles = (this.windowsWidth / 2) - 100;

    this.workflowService.selectedWorkflowChanged.subscribe(repaintWorkflow => {
      console.log('Repaint windowsWidth:', this.windowsWidth);
      console.log('Repaint positionXTitles:', this.positionXTitles);

      this.workflow = repaintWorkflow;
      this.defineColumnsAndX(this.windowsWidth);
    });
  }

  defineColumnsAndX(windowsWidth) {
    if (this.workflow.groupStepOverview) {
      this.workflow.groupStepOverview.forEach(group => {
        if (group.step) {
          group.step.forEach((step: Step) => {

            if (this.stepIsMain(step)) {
              step.x = (windowsWidth / 2);
              step.y = 0;
            } else {
              switch (step.position) {
                case 0:
                  step.x = (windowsWidth / 2);
                  break;
                case 1:
                  step.x = (windowsWidth / 2) - (this.stepWidth / 2) - this.margin;
                  break;
                case 2:
                  step.x = (windowsWidth / 2) + (this.stepWidth / 2) + this.margin;
                  break;
                case 3:
                  step.x = (windowsWidth / 2) - this.stepWidth - (this.stepWidth / 2) - (this.margin * 3);
                  break;
                case 4:
                  step.x = (windowsWidth / 2) - (this.stepWidth / 2) - this.margin;
                  break;
                case 5:
                  step.x = (3 * (windowsWidth / 4)) + 5;
                  break;
                case 6:
                  step.x = (3 * (windowsWidth / 4)) + 5;
                  break;
                default: step.x = (windowsWidth / 2) - (this.stepWidth / 2);
              }
              // console.log('Position Step. X by Position:' + step.position, step.x);
            }

            this.setChildrenPositionY(step);
            this.childConnectors(step, group);
            this.setGroupHeight(group, step);
          });
        }
      });
    }
  }

  // Set Positions
  setChildrenPositionY(step: Step) {
    step.y = ((step.stepLevel - 1) * this.stepHeight) + 50;

    if (step.stepTypeId === 10) {
      console.log('Step', step.stepPredecesorsStepChild);
    }
  }

  // Analize Child Connectors (For the connector lines)
  childConnectors(step: Step, group: GroupStepOverview) {
    if (step.stepTypeId === 10) {
      // console.log('Connect Children:', step.stepPredecesorsStepChild);
      group.step.forEach((stepGroup: Step) => {
        step.stepPredecesorsStepChild.forEach((stepFather: StepPredecesors) => {
          if (stepGroup.stepId === stepFather.stepFatherId) {
            if (stepGroup.position === step.position) {
              step.levelFatherCondition = stepGroup.stepLevel;
            } else if (stepGroup.position === step.position + 1) {
              step.levelFatherLeft = stepGroup.stepLevel;
            } else if (stepGroup.position === step.position + 2) {
              step.levelFatherRight = stepGroup.stepLevel;
            }
            // console.log('Step: ' + stepGroup.stepId +
            // ', Step Level:' + stepGroup.stepLevel +
            // ', Pos:' + stepGroup.position);
          }
        });
      });

      // console.log('levelFatherCondition:', step.levelFatherCondition);
      // console.log('levelFatherLeft:', step.levelFatherLeft);
      // console.log('levelFatherRight:', step.levelFatherRight);

      if (step.levelFatherCondition && step.levelFatherLeft && step.levelFatherRight == null) {
        step.levelFatherRight = step.levelFatherCondition;
      } else if (step.levelFatherCondition && step.levelFatherRight && step.levelFatherLeft == null) {
        step.levelFatherLeft = step.levelFatherCondition;
      }

      if (step.levelFatherLeft && step.levelFatherLeft !== 0) {
        step.levelFatherLeft = (step.stepLevel - step.levelFatherLeft) - 1;
      }
      if (step.levelFatherRight && step.levelFatherRight !== 0) {
        step.levelFatherRight = (step.stepLevel - step.levelFatherRight) - 1;
      }

      console.log('Connector:', step);
    }
  }

  setGroupHeight(group: GroupStepOverview, step: Step) {
    const newHeight = ((step.stepLevel - 1) * this.stepHeight) + 160;
    if (group.height && group.height < newHeight) {
      group.height = newHeight;
      // console.log('New height, group:' + group.groupId, group.height);
    } else if (!group.height) {
      group.height = newHeight;
    }
  }

  // Is Step the first step
  stepIsMain(step: Step) {
    if (step.stepPredecesorsStepChild === null || step.stepPredecesorsStepChild.length === 0) {
      return true;
    }
    return false;
  }

  // Configure Group
  configureGroup(group: GroupStepOverview) {
    this.deselecAll();
    this.workflowService.setSelectedGroup(group);
  }

  // Select Steps
  selectStep(event: any, step: Step, group: GroupStepOverview) {
    this.deselecAll();
    this.workflowService.setSelectedStep(step);
    this.workflowService.selectedConnectorGroup = group;
  }

  // Select Connectors
  deselecAll() {
    this.workflowService.selectedConnectorStep = null;

    this.workflow.groupStepOverview.forEach((group: GroupStepOverview) => {
      group.selected = false;

      if (group.step && group.step.length > 0) {
        group.step.forEach((step: Step) => {
          if (step.selected === true) {
            step.selected = false;
          }
        });
      }
    });
  }

  selectConnector(event: any, step: Step, group: GroupStepOverview) {
    console.log('Select Connector: ', step);

    this.deselecAll();
    step.selected = !step.selected;
    this.workflowService.selectedConnectorStep = step;
    this.workflowService.selectedConnectorGroup = group;
  }

  selectConnectorCondition(event: any, step: Step, group: GroupStepOverview, sideRight: boolean) {
    console.log('Select Connector: ', step);

    this.deselecAll();
    step.selected = !step.selected;
    step.selectedRight = sideRight;
    this.workflowService.selectedConnectorStep = step;
    this.workflowService.selectedConnectorGroup = group;
  }

  selectConnectorGroup(event: any, group: GroupStepOverview) {
    this.deselecAll();
    group.selected = true;
    this.workflowService.selectedConnectorStep = this.selectLastGroups(group);
    this.workflowService.selectedConnectorGroup = group;
    console.log('Last step', this.workflowService.selectedConnectorStep);
  }

  selectLastGroups(group: GroupStepOverview) {
    let beforeWorkflow = false;
    for (let i = this.workflowService.selectedWorkflow.groupStepOverview.length - 1; i >= 0; i--) {
      if (beforeWorkflow) {
        if (this.workflowService.selectedWorkflow.groupStepOverview[i].step &&
          this.workflowService.selectedWorkflow.groupStepOverview[i].step.length > 0) {

          console.log('Group selected:', this.workflowService.selectedWorkflow.groupStepOverview[i]);
          return this.selectLastChild(this.workflowService.selectedWorkflow.groupStepOverview[i]);
        }
      } else if (this.workflowService.selectedWorkflow.groupStepOverview[i].groupId === group.groupId) {
        beforeWorkflow = true;
      }
    }
  }

  selectLastChild(group: GroupStepOverview) {
    let stepLevel = 0;
    let lastStep: Step;

    group.step.forEach((step: Step) => {
      if (step.stepLevel > stepLevel) {
        stepLevel = step.stepLevel;
        lastStep = step;
      }
    });
    console.log(stepLevel, lastStep);

    return lastStep;
  }

}
