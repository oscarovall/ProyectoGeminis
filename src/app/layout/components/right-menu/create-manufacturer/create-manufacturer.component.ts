import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ManufacturersService } from '../../../../services/manufacturers/manufacturers.service';
import { Manufacturer } from '../../../../models/Manufacturer';

@Component({
  selector: 'app-create-manufacturer',
  templateUrl: './create-manufacturer.component.html',
  styleUrls: ['./create-manufacturer.component.css']
})
export class CreateManufacturerComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  wasValidated = false;
  data: Manufacturer;
  tilte = 'Add';
  constructor(
    public usrService: UserService,
    private _snackBar: MatSnackBar,
    private manufacturerService: ManufacturersService
  ) {
    this.manufacturerService.selectedManufacturerChanged.subscribe((data: Manufacturer) => this.getManufacturerSelected());
  }

  ngOnInit() {
    this.getManufacturerSelected();
  }

  getManufacturerSelected() {
    this.data = null;
    if (this.manufacturerService.selectedManufacturer) {
      this.data = this.manufacturerService.selectedManufacturer;
      console.log('Editar:', this.data);
      if (this.data.manufacturerId || this.data.manufacturerId === 0) {
        this.tilte = 'Edit';
      } else {
        this.tilte = 'Add';
      }
    } else {
      console.log('No storage selected');
    }
  }

  cancel() {
    if (this.manufacturerService.selectedManufacturer) {
      this.manufacturerService.selectedManufacturer = null;
      this.usrService.hideRightMenu();
    } else {
      console.log('No storage selected');
    }
  }

  save() {
    if (this.form.valid === false) {
      this.wasValidated = true;
    } else {
      this.wasValidated = false;

      if (this.data.manufacturerId) {
        this.manufacturerService.updateManufacturer(this.data).subscribe((data: Manufacturer) => {
          this.manufacturerService.setSelectedManufacturer(data);
          this.sendNotification('Manufacturer updated');
          this.terminateSave();
        });
      } else {
        this.manufacturerService.createManufacturer(this.data).subscribe((data: Manufacturer) => {
          this.manufacturerService.setSelectedManufacturer(data);
          this.sendNotification('Manufacturer created');
          this.terminateSave();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.manufacturerService.saveDoneManufacturer(this.manufacturerService.selectedManufacturer);
    this.manufacturerService.selectedManufacturer = null;
    this.usrService.hideRightMenu();
  }


}
