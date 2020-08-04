
import { Component, OnInit, Inject } from '@angular/core';
import { Step } from '../../../../models/workflow/Step';
import { Class } from '../../../../models/Class';
import { AttributeType } from '../../../../models/AttributeType';
import { Attribute } from '../../../../models/Attribute';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClassesService } from '../../../../services/service.index';

@Component({
  selector: 'app-modal-condition',
  templateUrl: './modal-condition.component.html',
  styleUrls: ['./modal-condition.component.css']
})
export class ModalConditionComponent implements OnInit {

  attTypesToShow: AttributeType[] = [];
  values1ToShow: Attribute[] = [];
  values2ToShow: Attribute[] = [];
  newStep: Step;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<ModalConditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public classesService: ClassesService) {
    console.log('Data:', data);
    this.newStep = data.step;
    this.action = data.action;
  }

  ngOnInit() {
    console.log('Step:', this.newStep);

    if (this.classesService.classes) {
      console.log('Classes Modal 1:', this.classesService.classes);
      this.updateClasses(this.classesService.classes);
    } else {
      this.classesService.updateClasses.subscribe((classObj: Class[]) => {
        console.log('Classes Modal 2:', this.classesService.classes);
        this.updateClasses(classObj);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateClasses(classes: Class[]) {
    if (classes) {
      classes.forEach((classobj: Class) => {
        classobj.attributeType.forEach((attType: AttributeType) => {
          if (attType.dataTypeId === 4 || attType.dataTypeId === 7) {
            this.attTypesToShow.push(attType);

            if (this.newStep.attributeTypeId && this.newStep.attributeTypeId === attType.attributeTypeId) {
              // if (this.newStep.mainValue) {
                this.newStep.attributeType = attType;
                this.values1ToShow = attType.attribute;
                this.values2ToShow = attType.attribute;
                // attType.attribute.forEach((att: Attribute) => {
                //   if(this.newStep.mainValue === att.attributeId){
                //     this.
                //   }
                // });
              // }
            }
          }
        });
      });
    }
  }

  saveButton() {
    console.log('Saving', this.newStep);
    if (this.newStep.mainValueId === null || this.newStep.secondaryValueId === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Issue on the selected parameters',
        text: 'Some parameters are missing.'
      });
    } else if (this.newStep.mainValueId === this.newStep.secondaryValueId) {
      Swal.fire({
        icon: 'warning',
        title: 'Issue on the selected parameters',
        text: 'The Main and Second values must be different.'
      });
    } else {
      this.dialogRef.close({ action: this.action, step: this.newStep });
    }
  }

  closeButton() {
    this.dialogRef.close();
  }

  attTypeChanged($event: any) {
    const value = $event.target.value;
    this.values1ToShow = [];
    this.values2ToShow = [];

    this.classesService.classes.forEach((classobj: Class) => {
      this.attTypesToShow.forEach((attType: AttributeType) => {
        console.log('Value 1 changed:', attType.attributeTypeId === value);
        if (attType.attributeTypeId === Number.parseInt(value, 10)) {
          // Changing the step
          this.newStep.attributeType = attType;
          this.values1ToShow = attType.attribute;
          this.values2ToShow = attType.attribute;
        }

      });
    });
  }

  attValue1Changed($event: any) {
    const value = $event.target.value;
    console.log('Value 1 changed:', value);
    this.newStep.attributeType.attribute.forEach((att: Attribute) => {
      if (att.attributeId === Number.parseInt(value, 10)) {
        this.newStep.mainValueId = att.attributeId;
      }
    });
  }

  attValue2Changed($event: any) {
    const value = $event.target.value;
    console.log('Value 2 changed:', value);
    console.log('Step:', this.newStep);

    this.newStep.attributeType.attribute.forEach((att: Attribute) => {
      if (att.attributeId === Number.parseInt(value, 10)) {
        console.log('Added:', att.attributeId );

        this.newStep.secondaryValueId = att.attributeId;
      }
    });
  }

  deleteButton() {
    console.log(this.newStep);
    this.dialogRef.close({ action: 'Delete', step: this.newStep });
  }

}
