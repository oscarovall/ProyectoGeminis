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

@Component({
  selector: 'app-add-product-inv',
  templateUrl: './add-product-inv.component.html',
  styleUrls: ['./add-product-inv.component.css']
})
export class AddProductInvComponent implements OnInit {

  home: Home;
  lead: Lead;
  locations;
  homeSelected;
  serial;
  hud;
  locationId: number;
  newProductInv: ProductInv;
  catalogHomes: Product[];


  constructor(
    private productService: ProductService,
    private catalogService: CatalogService,
    private userService: UserService,
    private leadsService: LeadsService,
    private _snackBar: MatSnackBar
  ) {
    this.home = this.productService.selectedHome;
    this.productService.selectedHomeChanged.subscribe((home: Home) => {
      this.home = home;
    });
    this.getAllLots();
    this.getAllCatalog();
  }

  ngOnInit() {

  }

  getAllLots() {
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

  showModal(url: string, iframe: boolean) {
    this.userService.showModal(url, iframe);
  }


  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  save() { }
}
