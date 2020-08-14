import { Location } from './../../../../models/Location';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Home } from '../../../../models/crm/Home';
import { Lead } from '../../../../models/crm/lead';
import { ProductService } from '../../../../services/Product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { LeadsService } from '../../../../services/leads/leads.service';
import { ProductInv } from '../../../../models/crm/ProductInv';
import { CatalogService } from '../../../../services/catalog/catalog.service';
import { Product } from '../../../../models/crm/Product';
import { ProductInvAvailableStatus } from '../../../../models/crm/ProductInvAvailableStatus';
import { ProductInvUsedStatus } from '../../../../models/crm/ProductInvUsedStatus';

@Component({
  selector: 'app-add-product-inv',
  templateUrl: './add-product-inv.component.html',
  styleUrls: ['./add-product-inv.component.css']
})
export class AddProductInvComponent implements OnInit {

  homeInv: ProductInv;
  lead: Lead;
  locations: Location[];
  availableStatusList: ProductInvAvailableStatus[];
  usedStatusList: ProductInvUsedStatus[];
  locationId: number;
  newProductInv: ProductInv;
  catalogHomes: Product[];
  showCatalogHomes: boolean = true;

  /* data */
  locationSelected: number;
  catalogHomeSelected: Product;

  constructor(
    private productService: ProductService,
    private catalogService: CatalogService,
    private userService: UserService,
    private leadsService: LeadsService,
    private _snackBar: MatSnackBar
  ) {
    this.getAllCatalog();
    this.getOptionsForProductInv();
    this.loadAllLots();

    this.productService.selectedHomeInvChanged
      .subscribe((homeInv: ProductInv) => {
        this.cleanData();
        this.homeInv = homeInv;
        this.locationSelected = (this.homeInv.lot) ? this.homeInv.lot.lotId : this.locationSelected;
        this.showCatalogHomes = (this.homeInv.productInvId) ? false : true;
      });
  }



  cleanData() {
    this.homeInv = null;
    this.showCatalogHomes = true;
    this.locationSelected = null;
    this.catalogHomeSelected = null;
  }

  ngOnInit() {

  }

  loadAllLots() {
    this.productService.getAllLots().subscribe((response: any) => {
      this.locations = response.results;
      console.log('location->', this.locations);
    });
  }

  getAllCatalog() {
    this.catalogService.getCatalogHomes().subscribe((response: any) => {
      this.catalogHomes = response.results;
      console.log('catalogHomes->', this.catalogHomes);
    });
  }

  getOptionsForProductInv() {
    this.productService.getOptiosForProductInv().subscribe((response: any) => {
      this.availableStatusList = response.availableStatusList;
      this.usedStatusList = response.usedStatusList;
    });
  }

  showModal(url: string, iframe: boolean) {
    this.userService.showModal(url, iframe);
  }


  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  changeLocation() {
    this.catalogHomeSelected = null;
    if (this.locationSelected) {
      const productId = this.locations.find(loc => loc.lotId === this.locationSelected).productId;
      this.catalogHomeSelected = this.catalogHomes.find(catalog => catalog.productId === productId);
      console.log('casa seleccionada->', this.catalogHomeSelected);

    }
  }

  setPrice(price: number) {
    this.homeInv.price = price;
  }


  save() { }
}
