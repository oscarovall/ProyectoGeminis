import { Storage } from './../../../../models/Storage';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { DealershipService } from '../../../../services/dealership/dealership.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.css']
})
export class CreateStorageComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  wasValidated = false;
  data: Storage;
  tilte = 'Add';
  constructor(
    public usrService: UserService,
    private _snackBar: MatSnackBar,
    private dealershipService: DealershipService
  ) {
    this.dealershipService.selectedStorageChanged.subscribe((data: Storage) => this.getStorageSelected());
  }

  ngOnInit() {
    this.getStorageSelected();
  }

  getStorageSelected() {
    this.data = null;
    if (this.dealershipService.selectedStorage) {
      this.data = this.dealershipService.selectedStorage;
      console.log('Editar:', this.data);
      if (this.data.storageId || this.data.storageId === 0) {
        this.tilte = 'Edit';
      } else {
        this.tilte = 'Add';
      }
    } else {
      console.log('No storage selected');
    }
  }

  cancel() {
    if (this.dealershipService.selectedStorage) {
      this.dealershipService.selectedStorage = null;
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

      if (this.data.storageId) {
        this.dealershipService.updateStorage(this.data).subscribe((data: Storage) => {
          this.dealershipService.setSelectedStorage(data);
          this.sendNotification('Storage updated');
          this.terminateSave();
        });
      } else {
        this.dealershipService.createStorage(this.data).subscribe((data: Storage) => {
          this.dealershipService.setSelectedStorage(data);
          this.sendNotification('Storage created');
          this.terminateSave();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.dealershipService.saveDoneStorage(this.dealershipService.selectedStorage);
    this.dealershipService.selectedStorage = null;
    this.usrService.hideRightMenu();
  }

}
