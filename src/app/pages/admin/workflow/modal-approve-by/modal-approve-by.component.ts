import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Step } from '../../../../models/workflow/Step';
import { Role } from '../../../../models/Role';
import { UserService } from '../../../../services/service.index';

@Component({
  selector: 'app-modal-approve-by',
  templateUrl: './modal-approve-by.component.html',
  styleUrls: ['./modal-approve-by.component.css']
})
export class ModalApproveByComponent implements OnInit {
  newStep: Step;
  action: string;
  roles: Role[];

  constructor(
    public dialogRef: MatDialogRef<ModalApproveByComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService) {
    this.newStep = data.step;
    this.action = data.action;
  }

  ngOnInit() {
    this.roles = [];
    console.log('Step Approve by:', this.newStep);
    this.userService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;

      console.log('Step Role:', this.newStep);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveButton() {
    // console.log(this.newStep);
    if (this.newStep.name && this.newStep.name !== '' && this.newStep.roleId) {
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

  roleChanged($event: any) {
    const value = $event.target.value;

    this.newStep.roleId = value;
  }

}
