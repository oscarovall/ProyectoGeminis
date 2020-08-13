import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-home-rso',
  templateUrl: './change-home-rso.component.html',
  styleUrls: ['./change-home-rso.component.css']
})
export class ChangeHomeRsoComponent implements OnInit {

  comments: String;
  wasValidated = false;
  constructor(public dialogRef: MatDialogRef<ChangeHomeRsoComponent>) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  closeButton() {
    this.dialogRef.close();
  }

  confirmCloseTask() {
    if (this.comments && this.comments != '') {
      this.wasValidated = false;
      this.dialogRef.close(this.comments);
    } else {
      this.wasValidated = true;
    }
  }
}
