import { Storage } from './../../../models/Storage';
import { Component, OnInit } from '@angular/core';
import { DealershipService } from '../../../services/dealership/dealership.service';
import { Lot } from '../../../models/Lot';
import { Dealership } from '../../../models/Dealership';
import { UserService } from '../../../services/user/user.service';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'app-dealerships',
  templateUrl: './dealerships.component.html',
  styleUrls: ['./dealerships.component.css']
})
export class DealershipsComponent implements OnInit {

  loading = true;
  filterWords = '';
  dealerships: Dealership[];
  selectedDealership: Dealership = null;
  selectedStorage: Storage = null;
  wordsFilter: string;
  constructor(
    private dealershipService: DealershipService,
    private usrService: UserService,
    private config: AppConfig
  ) {
    this.getDealerships();
    this.dealershipService.selectedDealershipSaved.subscribe((data: Dealership) => this.getDealerships());
    this.dealershipService.selectedStorageSaved.subscribe((data: Storage) => this.getDealerships());
    this.dealershipService.selectedLotSaved.subscribe((data: Lot) => this.setLot(data));
  }

  ngOnInit() {
  }

  onKeyUp(words) {
    if (words && words !== '') {
      this.getDealerships();
    } else {
      this.getDealerships();
    }
  }

  getDealerships() {
    this.loading = true;
    this.dealershipService.getAllDealerships(this.filterWords).subscribe((response: any) => {
      this.loading = false;
      this.dealerships = response.results;
      this.validateInfoSelected();
    });
  }

  validateInfoSelected() {
    if (this.selectedDealership) {
      this.selectedDealership = this.dealerships.find(deal => deal.storeId === this.selectedDealership.storeId);
    }
  }

  setLot(data: Lot) {
    if (this.selectedStorage) {
      const index = this.selectedStorage.lotList.findIndex(lot => lot.lotId === data.lotId);
      if (index === -1) {
        this.selectedStorage.lotList.push(data);

      } else {
        this.selectedStorage.lotList[index] = data;
      }
    }

  }

  viewTeamMembers(selectedDealership: Dealership) {
    console.log('selectedDealership', selectedDealership);
  }

  viewStorage(selectedDealership: Dealership) {
    this.selectedDealership = selectedDealership;
    this.selectedStorage = null;
  }

  addDealership() {
    const newDealership = new Dealership();
    this.dealershipService.setSelectedDealership(newDealership);
    this.usrService.showHideRightMenu(this.config.rightMenu.dealership);
  }

  editDealership(selectedDealership: Dealership): void {
    const data = { ...selectedDealership };
    this.usrService.showHideRightMenu(this.config.rightMenu.dealership);
    setTimeout(() => { this.dealershipService.setSelectedDealership(data); });
  }

  addStorage() {
    const newStorage = new Storage();
    newStorage.storeId = this.selectedDealership.storeId;
    this.dealershipService.setSelectedStorage(newStorage);
    this.usrService.showHideRightMenu(this.config.rightMenu.storage);
  }

  editStorage(selectedStorage: Storage) {
    const data = { ...selectedStorage };
    this.usrService.showHideRightMenu(this.config.rightMenu.storage);
    setTimeout(() => { this.dealershipService.setSelectedStorage(data); });
  }

  addLot() {
    const newLot = new Lot();
    newLot.storageId = this.selectedStorage.storageId;
    this.dealershipService.setSelectedLot(newLot);
    this.usrService.showHideRightMenu(this.config.rightMenu.lot);
  }

  editLot(selectedLot: Lot) {
    const data = { ...selectedLot };
    this.usrService.showHideRightMenu(this.config.rightMenu.lot);
    setTimeout(() => { this.dealershipService.setSelectedLot(data); });
  }


}
