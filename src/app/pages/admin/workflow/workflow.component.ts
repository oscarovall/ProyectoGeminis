import { Component, OnInit } from '@angular/core';
import { StepType } from '../../../models/workflow/StepType';
import { Step } from '../../../models/workflow/Step';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalConditionComponent } from './modal-condition/modal-condition.component';
import { StepPredecesors } from '../../../models/workflow/StepPredecesors';
import { ModalEmailComponent } from './modal-email/modal-email.component';
import { ModalCreateGroupComponent } from './modal-create-group/modal-create-group.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupStepOverview } from '../../../models/workflow/GroupStepOverview';
import { ModalFillClassComponent } from './modal-fill-class/modal-fill-class.component';
import { ModalApproveByComponent } from './modal-approve-by/modal-approve-by.component';
import { Workflow } from '../../../models/workflow/Workflow';
import { ModalCreateTaskComponent } from './modal-create-task/modal-create-task.component';
import { ClassesService, WorkflowService } from '../../../services/service.index';
import { ModalChangeStatusComponent } from './modal-change-status/modal-change-status.component';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {

  setpsToUpdate: Step[];

  constructor(
    public workflowService: WorkflowService,
    public classesService: ClassesService,
    public conditionDialog: MatDialog,
    public modalDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    // Request the Workflows
    this.workflowService.requestWorkflowsAndMenu();
  }

  ngOnInit() {
    this.workflowService.selectedStepChanged.subscribe((selectedStep: Step) => {
      this.editStep(selectedStep);
    });

    this.workflowService.selectedGroupChanged.subscribe((selectedGroup: GroupStepOverview) => {
      this.editGroup(selectedGroup);
    });
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  // Step
  addStep(stepType: StepType) {
    // Group
    if (stepType.stepTypeId !== 7) {
      if (this.workflowService.selectedConnectorStep) {
        console.log('StepType:', stepType);
        // Condition
        if (stepType.stepTypeId === 0) {
          const newStep = this.workflowService.newStepObj(0);
          this.openConditionDialog(newStep, 'Create');

          // Send Email
        } else if (stepType.stepTypeId === 1) {
          const newStep = this.workflowService.newStepObj(1);
          this.openEmailDialog(newStep, 'Create');

          // Create task for Role
        } else if (stepType.stepTypeId === 2) {
          const newStep = this.workflowService.newStepObj(2);
          this.openCreateTaskDialog(newStep, 'Create');

          // Change Status
        } else if (stepType.stepTypeId === 3) {
          const newStep = this.workflowService.newStepObj(3);
          this.openChangeStatusDialog(newStep, 'Create');

          // Approve By & Approve RSO By
        } else if (stepType.stepTypeId === 4 || stepType.stepTypeId === 11) {
          const newStep = this.workflowService.newStepObj(4);
          this.openRoleDialog(newStep, 'Create');

          // ToDo Show Calculator
        } else if (stepType.stepTypeId === 5) {
          const newStep = this.workflowService.newStepObj(5);
          // ToDo
          this.openEmailDialog(newStep, 'Create');

          // Set Attributes
        } else if (stepType.stepTypeId === 6) {
          const newStep = this.workflowService.newStepObj(6);
          this.openClassDialog(newStep, 'Create');
        }

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'A connector needs to be selected',
          text: 'We need to know where you want to put the new step. Please select a connector first.'
        });
      }
    } else {
      const newGroup = new GroupStepOverview();
      newGroup.name = '';
      newGroup.position = 0;
      newGroup.workflowId = this.workflowService.selectedWorkflow.workflowId;
      this.workflowService.selectedWorkflow.groupStepOverview.forEach((group: GroupStepOverview) => {
        if (group.position >= newGroup.position) {
          newGroup.position = group.position + 1;
        }
      });
      this.openGroupDialog(newGroup, 'Create');
    }
  }

  // Edit GROUP
  editGroup(selectedGroup: GroupStepOverview) {
    console.log('Edit Group');
    this.openGroupDialog(selectedGroup, 'Edit');
  }

  // Edit STEP
  editStep(selectedStep: Step) {
    console.log('Edit Step');
    // ToDo Condition
    if (selectedStep.stepTypeId === 0) {
      this.openConditionDialog(selectedStep, 'Edit');
      // Send Email
    } else if (selectedStep.stepTypeId === 1) {
      this.openEmailDialog(selectedStep, 'Edit');
      // Create Task for Role
    } else if (selectedStep.stepTypeId === 2) {
      this.openCreateTaskDialog(selectedStep, 'Edit');
      // Change Status
    } else if (selectedStep.stepTypeId === 3) {
      this.openChangeStatusDialog(selectedStep, 'Edit');
      // Approve By & Approve RSO By
    } else if (selectedStep.stepTypeId === 4 || selectedStep.stepTypeId === 11) {
      this.openRoleDialog(selectedStep, 'Edit');
      // ToDo Show Calculator
    } else if (selectedStep.stepTypeId === 5) {
      this.openEmailDialog(selectedStep, 'Edit');
      // Set Attributes
    } else if (selectedStep.stepTypeId === 6) {
      this.openClassDialog(selectedStep, 'Edit');
    }
  }

  // GROUP Dialog
  openGroupDialog(group: GroupStepOverview, action: string): void {
    const groupConfig = new MatDialogConfig();
    groupConfig.data = { group: group, action: action };
    groupConfig.width = '400px';
    groupConfig.scrollStrategy = new NoopScrollStrategy();

    const groupRef = this.modalDialog.open(ModalCreateGroupComponent, groupConfig);
    groupRef.afterClosed().subscribe(result => {
      this.closeModalGroup(result);
    });
  }

  // CONDITION Dialog
  openConditionDialog(newStep: Step, action: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { step: newStep, action: action };
    dialogConfig.width = '400px';
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    const conditionRef = this.conditionDialog.open(ModalConditionComponent, dialogConfig);
    conditionRef.afterClosed().subscribe(result => {
      this.closeModalStep(result);
    });
  }

  // EMAIL Dialog
  openEmailDialog(newStep: Step, action: string): void {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = { step: newStep, action: action };
    modalConfig.width = '400px';
    modalConfig.scrollStrategy = new NoopScrollStrategy();

    const emailRef = this.modalDialog.open(ModalEmailComponent, modalConfig);
    emailRef.afterClosed().subscribe(result => {
      this.closeModalStep(result);
    });
  }

  // CLASS Dialog
  openClassDialog(newStep: Step, action: string): void {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = { step: newStep, action: action };
    modalConfig.width = '400px';
    modalConfig.scrollStrategy = new NoopScrollStrategy();

    const modalRef = this.modalDialog.open(ModalFillClassComponent, modalConfig);
    modalRef.afterClosed().subscribe(result => {
      this.closeModalStep(result);
    });
  }

  // CREATE TASK Dialog
  openCreateTaskDialog(newStep: Step, action: string): void {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = { step: newStep, action: action };
    modalConfig.width = '400px';
    modalConfig.scrollStrategy = new NoopScrollStrategy();

    const modalRef = this.modalDialog.open(ModalCreateTaskComponent, modalConfig);
    modalRef.afterClosed().subscribe(result => {
      this.closeModalStep(result);
    });
  }

  // APPROVE BY AND PPROVE RSO BY Dialog
  openRoleDialog(newStep: Step, action: string): void {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = { step: newStep, action: action };
    modalConfig.width = '400px';
    modalConfig.scrollStrategy = new NoopScrollStrategy();

    const modalRef = this.modalDialog.open(ModalApproveByComponent, modalConfig);
    modalRef.afterClosed().subscribe(result => {
      this.closeModalStep(result);
    });
  }

  // CHANGE STATUS Dialog
  openChangeStatusDialog(newStep: Step, action: string): void {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = { step: newStep, action: action };
    modalConfig.width = '400px';
    modalConfig.scrollStrategy = new NoopScrollStrategy();

    const modalRef = this.modalDialog.open(ModalChangeStatusComponent, modalConfig);
    modalRef.afterClosed().subscribe(result => {
      this.closeModalStep(result);
    });
  }

  // Close Modal GROUP
  closeModalGroup(result) {
    console.log('The group dialog was closed: ', result);
    if (result && result.action && result.action === 'Create') {
      // this.createGroup(result.group);
      this.workflowService.createGroupStepOverview(result.group).subscribe((group: GroupStepOverview) => {
        this.workflowService.selectedWorkflow.groupStepOverview.push(group);
        this.workflowService.repaint();
        this.sendNotification('Group created');
      });
    } else if (result && result.group && result.action && result.action === 'Edit') {
      this.workflowService.updateGroupStepOverview(result.group).subscribe(() => {
        this.sendNotification('Group saved');
      });
    } else if (result && result.group && result.action && result.action === 'Delete') {
      this.workflowService.deleteGroupStepOverview(result.group).subscribe(() => {
        const index = this.workflowService.selectedWorkflow.groupStepOverview.indexOf(result.group, 0);
        if (index > -1) {
          this.workflowService.selectedWorkflow.groupStepOverview.splice(index, 1);
        }
        this.sendNotification('Group deleted');
      });
    } else {
      this.sendNotification('Group not saved');
    }
  }

  // Close Modal STEP
  closeModalStep(result) {
    console.log('The step dialog was closed: ', result);
    if (result && result.action && result.action === 'Create') {
      this.workflowService.createStep(result.step).subscribe((newStep: Step) => {
        this.sendNotification('Step saved');
      });
    } else if (result && result.action && result.action === 'Edit') {
      this.workflowService.updateStep(result.step).subscribe(() => {
        this.sendNotification('Step saved');
      });
    } else if (result && result.action && result.action === 'Delete') {
      this.setpsToUpdate = [];
      this.workflowService.deleteStep(result.step).subscribe(() => {
        this.sendNotification('Step deleted');
      });
    } else {
      this.sendNotification('Information not saved');
    }
  }


}
