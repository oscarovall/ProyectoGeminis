import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Manufacturer } from '../../../../models/Manufacturer';
import { ManufacturersService } from '../../../../services/manufacturers/manufacturers.service';
import { UserService } from '../../../../services/user/user.service';
import { AppConfig } from '../../../../app.config';
import { Product } from '../../../../models/crm/Product';
import { Plant } from '../../../../models/Plant';
import { CatalogService } from '../../../../services/catalog/catalog.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  loading = true;
  filterWords = '';
  manufacturers: Manufacturer[];
  products: Product[];
  plants: Plant[];
  selectedManufacturer: Manufacturer = null;
  selectedStorage: Storage = null;
  wordsFilter: string;
  display = 0;
  constructor(
    private manufacturerService: ManufacturersService,
    private catalogService: CatalogService,
    private usrService: UserService,
    private config: AppConfig,
    private _snackBar: MatSnackBar,
  ) {
    this.getManufacturers();
    this.manufacturerService.selectedManufacturerSaved.subscribe((data: Manufacturer) => this.getManufacturers());
    this.manufacturerService.selectedPlantSaved.subscribe((data: Plant) => this.getPlantsByManufacturer());
  }

  ngOnInit() {
  }

  onKeyUp(words) {
    if (words && words !== '') {
      this.getManufacturers();
    } else {
      this.getManufacturers();
    }
  }

  getManufacturers() {
    this.loading = true;
    this.manufacturerService.getAllManufacturers(this.filterWords).subscribe((response: any) => {
      this.loading = false;
      this.manufacturers = response.results;
    });
  }

  viewProducts(selectedManufacturer: Manufacturer) {
    this.display = 1;
    this.selectedManufacturer = selectedManufacturer;
    this.getProductsByManufacturer();
  }

  getProductsByManufacturer() {
    this.loading = true;
    const manufacturerId = this.selectedManufacturer.manufacturerId;
    this.manufacturerService.getAllManufacturerProducts(manufacturerId).subscribe((response: any) => {
      this.loading = false;
      this.products = response.results;
    });
  }

  viewPlants(selectedManufacturer: Manufacturer) {
    this.display = 2;
    this.selectedManufacturer = selectedManufacturer;
    this.getPlantsByManufacturer();
  }

  getPlantsByManufacturer() {
    this.loading = true;
    this.manufacturerService.getAllManufacturerPlants(this.selectedManufacturer.manufacturerId).subscribe((response: any) => {
      this.loading = false;
      this.plants = response.results;
    });
  }

  showHideHome(flag: boolean, data: Product) {
    console.log('show / hide', data);
    data.active = flag;
    this.loading = true;
    this.catalogService.updateCatalog(data).subscribe((data: Product) => {
      this.sendNotification('Product updated');
      this.loading = false;
    });
  }

  addManufacturer() {
    const newManufacturer = new Manufacturer();
    this.manufacturerService.setSelectedManufacturer(newManufacturer);
    this.usrService.showHideRightMenu(this.config.rightMenu.manufacturer);
  }

  editManufacturer(selectedManufacturer: Manufacturer): void {
    const data = { ...selectedManufacturer };
    this.usrService.showHideRightMenu(this.config.rightMenu.manufacturer);
    setTimeout(() => { this.manufacturerService.setSelectedManufacturer(data); });
  }

  addProduct() {
    const newProduct = new Product();
    this.manufacturerService.setSelectedProduct(newProduct);
    this.usrService.showHideRightMenu(this.config.rightMenu.catalog);
  }

  editProduct(selectedProduct: Product): void {
    const data = { ...selectedProduct };
    this.usrService.showHideRightMenu(this.config.rightMenu.catalog);
    setTimeout(() => { this.manufacturerService.setSelectedProduct(data); });
  }

  addPlant() {
    const newPlant = new Plant();
    newPlant.manufacturerId = this.selectedManufacturer.manufacturerId;
    this.manufacturerService.setSelectedPlant(newPlant);
    this.usrService.showHideRightMenu(this.config.rightMenu.plant);
  }

  editPlant(selectedPlant: Plant): void {
    const data = { ...selectedPlant };
    data.manufacturerId = this.selectedManufacturer.manufacturerId;
    this.usrService.showHideRightMenu(this.config.rightMenu.plant);
    setTimeout(() => { this.manufacturerService.setSelectedPlant(data); });
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }
}
