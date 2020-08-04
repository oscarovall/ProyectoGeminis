import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dealership } from '../../../../models/Dealership';
import { UserService } from '../../../../services/user/user.service';
import { DealershipService } from '../../../../services/dealership/dealership.service';

@Component({
  selector: 'app-create-dealership',
  templateUrl: './create-dealership.component.html',
  styleUrls: ['./create-dealership.component.css']
})
export class CreateDealershipComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  wasValidated = false;
  data: Dealership;
  tilte = 'Add';
  constructor(
    public usrService: UserService,
    private _snackBar: MatSnackBar,
    private dealershipService: DealershipService
  ) {
    this.dealershipService.selectedDealershipChanged.subscribe((data: Dealership) => this.getDealershipSelected());
  }

  ngOnInit() {
    this.getDealershipSelected();
  }

  getDealershipSelected() {
    this.data = null;
    if (this.dealershipService.selectedDealership) {
      this.data = this.dealershipService.selectedDealership;
      console.log('Editar:', this.data);
      if (this.data.storeId || this.data.storeId === 0) {
        this.tilte = 'Edit';
      } else {
        this.tilte = 'Add';
      }
    } else {
      console.log('No role selected');
    }
  }

  cancel() {
    if (this.dealershipService.selectedDealership) {
      this.dealershipService.selectedDealership = null;
      this.usrService.hideRightMenu();
    } else {
      console.log('No role selected');
    }
  }

  changePhoneNumber(event) {
    this.data.phoneNumber = null;
    if (event) {
      this.data.phoneNumber = event;
    } else {
      this.wasValidated = true;
    }
  }

  save() {
    if (this.form.valid === false) {
      this.wasValidated = true;
    } else {
      this.wasValidated = false;

      if (this.data.storeId) {
        this.dealershipService.updateStore(this.data).subscribe((newDealer: Dealership) => {
          this.dealershipService.setSelectedDealership(newDealer);
          this.sendNotification('Dealership updated');
          this.terminateSave();
        });
      } else {
        this.dealershipService.createStore(this.data).subscribe((newRole: Dealership) => {
          this.dealershipService.setSelectedDealership(newRole);
          this.sendNotification('Dealership created');
          this.terminateSave();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.dealershipService.saveDoneDealership(this.dealershipService.selectedDealership);
    this.dealershipService.selectedDealership = null;
    this.usrService.hideRightMenu();
  }

}
