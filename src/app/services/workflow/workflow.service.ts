import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workflow } from '../../models/workflow/Workflow';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { StepType } from '../../models/workflow/StepType';
import { GroupStepOverview } from '../../models/workflow/GroupStepOverview';
import { Step } from '../../models/workflow/Step';
import { StepPredecesors } from '../../models/workflow/StepPredecesors';
import { AppConfig } from '../../app.config';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  public workflows: Workflow[];
  public selectedWorkflow: Workflow;

  // Workflow Screen
  public menuStepTypes: StepType[];
  public menuGroups: string[];
  public selectedConnectorStep: Step;
  public selectedStep: Step;
  public selectedConnectorGroup: GroupStepOverview;
  public selectedWorkflowChanged = new EventEmitter<Workflow>();
  public selectedStepChanged = new EventEmitter<Step>();
  public selectedGroupChanged = new EventEmitter<GroupStepOverview>();

  setpsToUpdate: Step[];

  constructor(private http: HttpClient, private config: AppConfig) {
    this.menuGroups = [];
    this.menuStepTypes = [];

    ////////////////////////////////////////////////////////////////
    // It should be when the component is created and it is needed
    ////////////////////////////////////////////////////////////////
    // this.requestWorkflowsAndMenu();
  }

  requestWorkflowsAndMenu() {
    this.getWorkflows().subscribe(workflows => {
      console.log('Workflows', workflows);
      this.workflows = workflows;
      this.selectedWorkflow = this.workflows[0];
      this.selectedWorkflowChanged.emit(this.selectedWorkflow);
    });

    this.getStepTypes().subscribe(stepTypes => {
      // console.log('StepTypes', stepTypes);
      this.menuStepTypes = stepTypes;

      stepTypes.forEach((element: StepType) => {
        if (this.menuGroups.indexOf(element.setStepType) === -1) {
          this.menuGroups.push(element.setStepType);
        }
      });

      // console.log(this.menuGroups);
    });
  }

  requestWorkflow() {
    this.getWorkflow(this.selectedWorkflow.workflowId).subscribe((workflow: Workflow) => {
      this.selectedWorkflow = workflow;
      this.selectedWorkflow.groupStepOverview.forEach((group: GroupStepOverview) => {
        if (group.groupId === this.selectedConnectorGroup.groupId) {
          this.selectedConnectorGroup = group;
        }
      });
      console.log('Request Workflow:', this.selectedWorkflow);

      this.selectedWorkflowChanged.emit(this.selectedWorkflow);
    });
  }

  repaint() {
    this.selectedWorkflowChanged.emit(this.selectedWorkflow);
    console.log('Worklow: ', this.selectedWorkflow);
  }

  setSelectedStep(step: Step) {
    this.selectedStep = step;
    this.selectedStepChanged.emit(this.selectedStep);
  }

  setSelectedGroup(group: GroupStepOverview) {
    this.selectedConnectorGroup = group;
    this.selectedGroupChanged.emit(this.selectedConnectorGroup);
  }


  ////////////////////////////////////////////
  //   WORKFLOWS
  ////////////////////////////////////////////
  getWorkflows() {
    return this.http.get<Workflow[]>(environment.api + `Workflows`)
      .pipe(
        // map( (workflows: Workflow[]) => {
        //   workflows.forEach(workflow => {
        //     this.getGroupStepOverviewsForWorkflow(workflow.workflowId)
        //     .subscribe((groups: GroupStepOverview[]) => workflow.groupStepOverview = groups);
        //   });
        //   console.log('Workflows', workflows);
        //   return workflows;
        // }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Workflows',
            text: err.message
          });
          return [];
        })
      );
  }

  getWorkflow(workflowId: number) {
    return this.http.get<Workflow>(`${environment.api}Workflows/${workflowId}`)
      .pipe(
        // map( (workflows: Workflow[]) => {
        //   workflows.forEach(workflow => {
        //     this.getGroupStepOverviewsForWorkflow(workflow.workflowId)
        //     .subscribe((groups: GroupStepOverview[]) => workflow.groupStepOverview = groups);
        //   });
        //   console.log('Workflows', workflows);
        //   return workflows;
        // }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Workflows',
            text: err.message
          });
          return [];
        })
      );
  }

  ////////////////////////////////////////////
  //   STEP_TYPES -- MENU
  ////////////////////////////////////////////
  getStepTypes() {
    return this.http.get<StepType[]>(`${environment.api}StepTypes`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Step Types - Menu',
            text: err.message
          });
          return [];
        })
      );
  }

  ////////////////////////////////////////////
  //   GROUPS STEP OVERVIEW
  ////////////////////////////////////////////
  getGroupStepOverviewsForWorkflow(workflowId: number) {
    return this.http.get<GroupStepOverview[]>(`${environment.api}GroupStepOverviews/Workflow/${workflowId}`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Groups of Workflows',
            text: err.message
          });
          return [];
        })
      );
  }

  updateChangedSteps(stepsChanged: Step[]) {
    return this.http.put(`${environment.api}Steps/Set`, stepsChanged)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when changing Steps position',
            text: err.message
          });
          return [];
        })
      );
  }

  updateGroupStepOverview(group: GroupStepOverview) {
    return this.http.put(`${environment.api}GroupStepOverviews/${this.selectedConnectorGroup.groupId}`, group)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when saving a Group',
            text: err.message
          });
          return [];
        })
      );
  }

  deleteGroupStepOverview(group: GroupStepOverview) {
    return this.http.delete(`${environment.api}GroupStepOverviews/${this.selectedConnectorGroup.groupId}`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when deleting a Group',
            text: err.message
          });
          return [];
        })
      );
  }

  createGroupStepOverview(group: GroupStepOverview) {
    console.log('Create group:', group);
    return this.http.post(`${environment.api}GroupStepOverviews`, group)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a Group',
            text: err.message
          });
          return [];
        })
      );
  }

  ////////////////////////////////////////////
  //   STEP
  ////////////////////////////////////////////
  newStepObj(stepTypeId) {
    let stepLevel = this.selectedConnectorStep.stepLevel + 1;

    if (this.selectedConnectorStep.groupId !== this.selectedConnectorGroup.groupId) {
      stepLevel = 1;
      console.log('C selectedConnectorStep', this.selectedConnectorStep);
      console.log('C selectedConnectorGroup', this.selectedConnectorGroup);

    }

    if (this.selectedConnectorStep.stepTypeId === this.config.stepType.condition) {
      if (this.selectedConnectorStep.selectedRight) {
        const newStep1 = new Step('', stepTypeId, stepLevel,
          this.selectedConnectorStep.position + 2,
          this.selectedConnectorGroup.groupId);
        newStep1.stepPredecesorsStepFather = this.selectedConnectorStep.stepPredecesorsStepFather;
        return newStep1;
      } else {
        const newStep1 = new Step('', stepTypeId, stepLevel,
          this.selectedConnectorStep.position + 1,
          this.selectedConnectorGroup.groupId);
        newStep1.stepPredecesorsStepFather = this.selectedConnectorStep.stepPredecesorsStepFather;
        return newStep1;
      }
    }

    const newStep = new Step('', stepTypeId, stepLevel,
      this.selectedConnectorStep.position,
      this.selectedConnectorGroup.groupId);
    newStep.stepPredecesorsStepFather = this.selectedConnectorStep.stepPredecesorsStepFather;
    return newStep;
  }

  createStep(step: Step) {
    this.setpsToUpdate = [];
    this.increaseLevelChildren(this.selectedConnectorStep);

    console.log('Create Steop', this.selectedConnectorStep.stepId);

    let url = '';
    if (step.stepPredecesorsStepFather && step.stepPredecesorsStepFather.length > 0) {
      url = `${environment.api}Steps`;
    } else {
      url = `${environment.api}Steps/${this.selectedConnectorStep.stepId}`;
    }

    console.log('Step', step, 'URL', url);

    return this.http.post(url, step)
      .pipe(
        map((newStep: Step) => {
          this.selectedConnectorGroup.step.push(newStep);

          // console.log('New step:', step);
          // Different to Condition
          if (step.stepTypeId !== this.config.stepType.condition) {

            // console.log('Steps to update:', this.setpsToUpdate);
            this.updateChangedSteps(this.setpsToUpdate).subscribe(() => {
              this.setpsToUpdate = [];

              // Update Values of the Workflow
              this.getWorkflow(this.selectedWorkflow.workflowId).subscribe((workflow: Workflow) => {
                this.selectedWorkflow = workflow;
                this.selectedWorkflow.groupStepOverview.forEach((group: GroupStepOverview) => {
                  if (group.groupId === this.selectedConnectorGroup.groupId) {
                    this.selectedConnectorGroup = group;
                  }
                });
                this.repaint();
              });
              return newStep;
            });
          } else {
            // console.log('Condition new Connector');

            this.selectedConnectorStep = newStep;
            this.createStep(this.newStepObj(this.config.stepType.connector)).subscribe();
          }
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when creating a new Step',
            text: err.message
          });
          return [];
        })
      );
  }

  updateStep(step: Step) {
    const url = `${environment.api}Steps/${step.stepId}`;

    console.log('Update Step:', step);
    return this.http.put(url, step)
      .pipe(catchError((err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error when updating a Step',
          text: err.message
        });
        return [];
      })
      );
  }

  deleteStep(oldStep: Step) {
    const url = `${environment.api}Steps/${oldStep.stepId}`;

    return this.http.delete(url)
      .pipe(
        map((result: Step) => {
          // console.log('Deleted:', result);

          this.setpsToUpdate = [];

          // Update Values of the Workflow
          this.getWorkflow(this.selectedWorkflow.workflowId).subscribe((workflow: Workflow) => {
            this.selectedWorkflow = workflow;
            this.selectedWorkflow.groupStepOverview.forEach((group: GroupStepOverview) => {
              if (group.groupId === this.selectedConnectorGroup.groupId) {
                this.selectedConnectorGroup = group;
              }
            });

            // Decrease level of steps
            // console.log('Decrease old Father Step:', oldStep);
            this.selectedConnectorGroup.step.forEach((step: Step) => {
              if (oldStep.stepPredecesorsStepChild[0] && step.stepId === oldStep.stepPredecesorsStepChild[0].stepFatherId) {
                // console.log('Decrease Step:', step);
                this.decreaseLevelChildren(step);
                if (oldStep.stepTypeId === this.config.stepType.condition) {
                  this.decreaseLevelChildren(step);
                }
              }
            });

            // Repaint
            this.repaint();

            // Update Levels
            this.updateChangedSteps(this.setpsToUpdate).subscribe(() => {
              this.setpsToUpdate = [];
            });

            return result;
          });
        }),
        catchError((err: any) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error when deleting a Step',
            text: err.message
          });
          return [];
        })
      );
  }

  increaseLevelChildren(step: Step) {
    step.stepPredecesorsStepFather.forEach((child: StepPredecesors) => {
      this.selectedConnectorGroup.step.forEach((stepGroup: Step) => {
        if (stepGroup.stepId === child.stepChildId) {
          // console.log('Step to Eval', step, 'Step Group', stepGroup);
          if (step.position === stepGroup.position ||
            stepGroup.stepTypeId === this.config.stepType.connector ||
            stepGroup.stepTypeId === this.config.stepType.condition) {
            // if (step.stepLevel === stepGroup.stepLevel) { // To evaluate in different cases
              // console.log('Increment step', stepGroup);
              stepGroup.stepLevel++;
              this.setpsToUpdate.push(stepGroup);
              if (stepGroup.stepPredecesorsStepFather != null && stepGroup.stepPredecesorsStepFather.length > 0) {
                this.increaseLevelChildren(stepGroup);
              }
            // }
          }
        }
      });
    });
  }

  decreaseLevelChildren(step: Step) {
    step.stepPredecesorsStepFather.forEach((child: StepPredecesors) => {
      this.selectedConnectorGroup.step.forEach((stepGroup: Step) => {
        // Find the right reference
        if (stepGroup.stepId === child.stepChildId) {
          console.log('Decrease ID Level: ', stepGroup.stepId);

          // Evaluate the level of the father(s)
          stepGroup.stepPredecesorsStepChild.forEach((stepFathers: StepPredecesors) => {
            let stepLevel = 0;
            this.selectedConnectorGroup.step.forEach((stepGroupFather: Step) => {
              if (stepGroupFather.stepId === stepFathers.stepFatherId) {
                if (stepLevel < stepGroupFather.stepLevel) {
                  stepLevel = stepGroupFather.stepLevel + 1;
                }
              }
            });
            stepGroup.stepLevel = stepLevel;
          });

          console.log('D Step to update:', stepGroup);
          this.setpsToUpdate.push(stepGroup);
          if (stepGroup.stepPredecesorsStepFather != null && stepGroup.stepPredecesorsStepFather.length > 0) {
            this.decreaseLevelChildren(stepGroup);
          }
          return;
        }
      });
    });
  }


}
