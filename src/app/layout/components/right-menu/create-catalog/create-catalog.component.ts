import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ManufacturersService } from '../../../../services/manufacturers/manufacturers.service';
import { Product } from '../../../../models/crm/Product';
import { CatalogService } from '../../../../services/catalog/catalog.service';

@Component({
  selector: 'app-create-catalog',
  templateUrl: './create-catalog.component.html',
  styleUrls: ['./create-catalog.component.css']
})
export class CreateCatalogComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  wasValidated = false;
  data: Product;
  title = 'Add';
  constructor(
    public usrService: UserService,
    private _snackBar: MatSnackBar,
    private manufacturerService: ManufacturersService,
    private catalogService: CatalogService
  ) {
    this.manufacturerService.selectedProductChanged.subscribe((data: Product) => this.getProductSelected());
  }

  ngOnInit() {
    this.getProductSelected();
  }

  getProductSelected() {
    this.data = null;
    if (this.manufacturerService.selectedProduct) {
      this.data = this.manufacturerService.selectedProduct;
      console.log('Editar:', this.data);
      if (this.data.productId || this.data.productId === 0) {
        this.title = 'Edit';
      } else {
        this.title = 'Add';
      }
    } else {
      console.log('No storage selected');
    }
  }

  cancel() {
    if (this.manufacturerService.selectedProduct) {
      this.manufacturerService.selectedProduct = null;
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

      if (this.data.productId) {
        this.catalogService.updateCatalog(this.data).subscribe((data: Product) => {
          this.manufacturerService.setSelectedProduct(data);
          this.sendNotification('Product updated');
          this.terminateSave();
        });
      } else {
        this.catalogService.createCatalog(this.data).subscribe((data: Product) => {
          this.manufacturerService.setSelectedProduct(data);
          this.sendNotification('Product created');
          this.terminateSave();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.manufacturerService.saveDoneProduct(this.manufacturerService.selectedProduct);
    this.manufacturerService.selectedProduct = null;
    this.usrService.hideRightMenu();
  }
}
