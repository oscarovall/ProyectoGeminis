import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Step } from '../../../../models/workflow/Step';
import { Role } from '../../../../models/Role';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/service.index';

@Component({
  selector: 'app-modal-create-task',
  templateUrl: './modal-create-task.component.html',
  styleUrls: ['./modal-create-task.component.css']
})
export class ModalCreateTaskComponent implements OnInit {

  newStep: Step;
  action: string;
  roles: Role[];

  constructor(
    public dialogRef: MatDialogRef<ModalCreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) {
    this.newStep = data.step;
    this.action = data.action;
  }

  ngOnInit() {
    // console.log('Step:', this.newStep);
    this.roles = [];
    this.userService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveButton() {
    console.log(this.newStep);
    if (this.newStep.name && this.newStep.name !== '' &&
      this.newStep.taskContent && this.newStep.taskContent !== '' &&
      this.newStep.roleId) {
      this.dialogRef.close({ action: this.action, step: this.newStep });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Issue on the selected parameters',
        text: 'Some parameters are missing.'
      });
    }
  }

  closeButton() {
    this.dialogRef.close();
  }

  deleteButton() {
    console.log(this.newStep);
    this.dialogRef.close({ action: 'Delete', step: this.newStep });
  }

  deadlineChange(value: number) {
    this.newStep.deadline = value;
    if (value === 0) {
      this.newStep.deadline = null;
    }
  }

}
