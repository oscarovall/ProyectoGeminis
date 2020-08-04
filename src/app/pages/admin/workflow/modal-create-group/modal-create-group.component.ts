import { Component, OnInit, Inject } from '@angular/core';
import { GroupStepOverview } from '../../../../models/workflow/GroupStepOverview';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-group',
  templateUrl: './modal-create-group.component.html',
  styleUrls: ['./modal-create-group.component.css']
})
export class ModalCreateGroupComponent implements OnInit {

  newGroup: GroupStepOverview;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.newGroup = data.group;
      this.action = data.action;
    }

  ngOnInit() {
  }

  saveButton() {
    console.log(this.newGroup);
    if (this.newGroup.name && this.newGroup.name !== '') {
      this.dialogRef.close({ action: this.action, group: this.newGroup });
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
    this.dialogRef.close({ action: 'Delete', group: this.newGroup });
  }

  deadlineChange(value: number) {
    this.newGroup.deadline = value;
    if (value === 0) {
      this.newGroup.deadline = null;
    }
  }

}
