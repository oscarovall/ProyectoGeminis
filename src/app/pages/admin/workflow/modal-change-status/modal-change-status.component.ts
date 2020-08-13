import { Component, OnInit, Inject } from '@angular/core';
import { Step } from '../../../../models/workflow/Step';
import { Role } from '../../../../models/Role';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../services/user/user.service';
import Swal from 'sweetalert2';
import { LeadsService } from '../../../../services/leads/leads.service';
import { LeadStatus } from '../../../../models/leadStatus';

@Component({
  selector: 'app-modal-change-status',
  templateUrl: './modal-change-status.component.html',
  styleUrls: ['./modal-change-status.component.css']
})
export class ModalChangeStatusComponent implements OnInit {

  newStep: Step;
  action: string;
  leadsStatus: LeadStatus[];

  constructor(
    public dialogRef: MatDialogRef<ModalChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService, public leadsService: LeadsService) {
    this.newStep = data.step;
    this.action = data.action;
  }

  ngOnInit() {
    this.leadsStatus = [];
    // console.log('Step Approve by:', this.newStep);
    // this.userService.getRoles().subscribe((roles: Role[]) => {
    //   this.roles = roles;
    //   console.log('Step Role:', this.newStep);
    // });

    this.leadsService.getLeadStatus().subscribe((leadsStatus: LeadStatus[]) => {
      console.log('leadsStatus', leadsStatus);
      this.leadsStatus = leadsStatus;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveButton() {
    // console.log(this.newStep);
    if (this.newStep.name && this.newStep.name !== '' && this.newStep.leadStatus) {
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

  // roleChanged($event: any) {
  //   const value = $event.target.value;

  //   this.newStep.roleId = value;
  // }

}
