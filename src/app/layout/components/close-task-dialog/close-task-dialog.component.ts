import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-close-task-dialog',
  templateUrl: './close-task-dialog.component.html',
  styleUrls: ['./close-task-dialog.component.css']
})
export class CloseTaskDialogComponent implements OnInit {

  comments: String;
  wasValidated = false;
  constructor(public dialogRef: MatDialogRef<CloseTaskDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  closeButton() {
    this.dialogRef.close();
  }

  confirmCloseTask() {
    if(this.comments && this.comments != ''){
      this.wasValidated = false;
      this.dialogRef.close(this.comments);
    } else {
      this.wasValidated = true;
    }
  }
}