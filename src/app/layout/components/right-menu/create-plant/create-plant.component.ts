import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ManufacturersService } from '../../../../services/manufacturers/manufacturers.service';
import { Plant } from '../../../../models/Plant';


@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.css']
})
export class CreatePlantComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  wasValidated = false;
  data: Plant;
  tilte = 'Add';
  constructor(
    public usrService: UserService,
    private _snackBar: MatSnackBar,
    private mfService: ManufacturersService
  ) {
    this.mfService.selectedPlantChanged.subscribe((data: Plant) => this.getPlantSelected());
  }

  ngOnInit() {
    this.getPlantSelected();
  }

  getPlantSelected() {
    this.data = null;
    if (this.mfService.selectedPlant) {
      this.data = this.mfService.selectedPlant;
      console.log('Editar:', this.data);
      if (this.data.manufacturerPlantId || this.data.manufacturerPlantId === 0) {
        this.tilte = 'Edit';
      } else {
        this.tilte = 'Add';
      }
    } else {
      console.log('No plant selected');
    }
  }

  cancel() {
    if (this.mfService.selectedPlant) {
      this.mfService.selectedPlant = null;
      this.usrService.hideRightMenu();
    } else {
      console.log('No plant selected');
    }
  }

  save() {
    if (this.form.valid === false) {
      this.wasValidated = true;
    } else {
      this.wasValidated = false;

      if (this.data.manufacturerPlantId || this.data.manufacturerPlantId === 0) {
        this.mfService.updatePlant(this.data).subscribe((data: Plant) => {
          this.mfService.setSelectedPlant(data);
          this.sendNotification('Plant updated');
          this.terminateSave();
        });
      } else {
        this.mfService.createPlant(this.data).subscribe((data: Plant) => {
          this.mfService.setSelectedPlant(data);
          this.sendNotification('Plant created');
          this.terminateSave();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.mfService.saveDonePlant(this.mfService.selectedPlant);
    this.mfService.selectedPlant = null;
    this.usrService.hideRightMenu();
  }


}
