import { Attribute } from './../../../../models/Attribute';
import { Component, OnInit, Inject } from '@angular/core';
import { AttributeType } from '../../../../models/AttributeType';
import { Step } from '../../../../models/workflow/Step';
import { ModalConditionComponent } from '../modal-condition/modal-condition.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Class } from '../../../../models/Class';
import Swal from 'sweetalert2';
import { Template } from '../../../../models/Template';
import { ClassesService, TemplatesService } from '../../../../services/service.index';

@Component({
  selector: 'app-modal-email',
  templateUrl: './modal-email.component.html',
  styleUrls: ['./modal-email.component.css']
})
export class ModalEmailComponent implements OnInit {
  newStep: Step;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<ModalEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public templateService: TemplatesService) {
    this.newStep = data.step;
    this.action = data.action;
  }

  ngOnInit() {
    console.log('Step:', this.newStep);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveButton() {
    console.log(this.newStep);
    if (this.newStep.name && this.newStep.name !== '' && this.newStep.templateId) {
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

  templateChanged($event: any) {
    const value = $event.target.value;

    this.templateService.templates.forEach((template: Template) => {
      if (template.templateId === Number.parseInt(value, 10)) {
        this.newStep.templateId = template.templateId;
      }
    });
  }

}
