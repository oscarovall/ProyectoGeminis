import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Lot } from '../../../../models/Lot';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { DealershipService } from '../../../../services/dealership/dealership.service';
import { CatalogService } from '../../../../services/catalog/catalog.service';
import { Product } from '../../../../models/crm/Product';

@Component({
  selector: 'app-create-lot',
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.css']
})
export class CreateLotComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  wasValidated = false;
  data: Lot;
  tilte = 'Add';
  catalogHomes: Product[];
  constructor(
    public usrService: UserService,
    private _snackBar: MatSnackBar,
    private dealershipService: DealershipService,
    private catalogService: CatalogService
  ) {
    this.dealershipService.selectedLotChanged.subscribe((data: Lot) => this.getLotSelected());
  }

  ngOnInit() {
    this.getLotSelected();
    this.getCatalogHomes();
  }

  getLotSelected() {
    this.data = null;
    if (this.dealershipService.selectedLot) {
      this.data = this.dealershipService.selectedLot;
      console.log('Editar:', this.data);
      if (this.data.lotId || this.data.lotId === 0) {
        this.tilte = 'Edit';
      } else {
        this.tilte = 'Add';
      }
    } else {
      console.log('No lot selected');
    }
  }

  getCatalogHomes() {
    this.catalogService.getCatalogHomes().subscribe((response: any) => {
      this.catalogHomes = response.results;
      console.log('this.catalogHomes->', this.catalogHomes);      
    });
  }

  cancel() {
    if (this.dealershipService.selectedLot) {
      this.dealershipService.selectedLot = null;
      this.usrService.hideRightMenu();
    } else {
      console.log('No lot selected');
    }
  }

  save() {
    if (this.form.valid === false) {
      this.wasValidated = true;
    } else {
      this.wasValidated = false;

      if (this.data.lotId) {
        this.dealershipService.updateLot(this.data).subscribe((data: Lot) => {
          this.dealershipService.setSelectedLot(data);
          this.sendNotification('Lot updated');
          this.terminateSave();
        });
      } else {
        this.dealershipService.createLot(this.data).subscribe((data: Lot) => {
          this.dealershipService.setSelectedLot(data);
          this.sendNotification('Lot created');
          this.terminateSave();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.dealershipService.saveDoneLot(this.dealershipService.selectedLot);
    this.dealershipService.selectedLot = null;
    this.usrService.hideRightMenu();
  }


}
