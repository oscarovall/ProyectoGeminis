import { MatSnackBar, MatStepper } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ManufacturersService } from '../../../../services/manufacturers/manufacturers.service';
import { Product } from '../../../../models/crm/Product';
import { CatalogService } from '../../../../services/catalog/catalog.service';
import { CurrencyPipe } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DocUploadComponent } from '../../../../ui/components/file-uploader/doc-upload/doc-upload.component';
import { ProductImg } from '../../../../models/crm/ProductImg';

@Component({
  selector: 'app-create-catalog',
  templateUrl: './create-catalog.component.html',
  styleUrls: ['./create-catalog.component.css']
})
export class CreateCatalogComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  @ViewChild('f', null) form: NgForm;
  @ViewChild('stepper', null) myStepper: MatStepper;
  wasValidated = false;
  data: Product;
  title = 'Add';
  isLinear = false;
  isCompleted = true;
  typesWide = ['Singlewide', 'Doublewide'];
  featureHomes = [true, false];
  constructor(
    public usrService: UserService,
    private _snackBar: MatSnackBar,
    private manufacturerService: ManufacturersService,
    private catalogService: CatalogService,
    private currencyPipe: CurrencyPipe,
    private _formBuilder: FormBuilder,
    public docsDialog: MatDialog,
    private userService: UserService
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
      if (this.data.productId || this.data.productId === 0) {
        this.title = 'Edit';
        this.validStepper(1);
      } else {
        this.title = 'Add';
        this.isCompleted = false;
        this.validStepper(0);
      }
    } else {
      console.log('No storage selected');
    }
  }

  validStepper(step) {
    this.isCompleted = (step === 0) ? false : true;
    setTimeout(() => {
      this.myStepper.selectedIndex = step;
    }, 1);
  }

  cancel() {
    this.usrService.hideRightMenu();
  }

  setPrice(price: number) {
    this.data.price = price;
  }

  save() {

    if (this.form.valid === false) {
      this.wasValidated = true;
    } else {
      this.wasValidated = false;

      this.isCompleted = true;

      if (this.data.productId) {
        this.catalogService.updateCatalog(this.data).subscribe((data: Product) => {
          this.manufacturerService.setSelectedProduct(data);
          this.sendNotification('Product updated');
          this.terminateSave();
          this.nextStep();
        });
      } else {
        this.data.manufacturerId = this.manufacturerService.selectedManufacturer.manufacturerId;
        this.data.productStatusId = 0;
        this.data.active = true;
        this.data.store = 'All';
        console.log('catalog->', this.data);
        this.catalogService.createCatalog(this.data).subscribe((data: Product) => {
          this.manufacturerService.setSelectedProduct(data);
          this.sendNotification('Product created');
          this.terminateSave();
          this.nextStep();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.manufacturerService.saveDoneProduct(this.manufacturerService.selectedProduct);
  }

  nextStep() {
    setTimeout(() => {
      this.myStepper.next();
    }, 0);
  }

  deleteFloorplan(data: Product) {
    if (data.productId) {
      this.catalogService.deleteFloorplanImg(data.productId).subscribe(res => {
        this.sendNotification('Floorplan Deleted');
        data.floorplanUrl = '';
        this.terminateSave();
      });
    }
  }

  deleteIcon(data: Product) {
    if (data.productId) {
      this.catalogService.deleteIcon(data.productId).subscribe(res => {
        this.sendNotification('Icon Deleted');
        data.iconUrl = '';
        this.terminateSave();
      });
    }
  }

  deleteProductImg(data: ProductImg, index) {
    console.log('index', index);
    if (data.productImgId) {
      this.catalogService.deleteproductImg(data.productImgId).subscribe(res => {
        this.sendNotification('Image Deleted');
        this.data.productImg.splice(index, 1);
        this.terminateSave();
      });
    }
  }

  deleteMainPictureImg(data: ProductImg, index) {
    if (data.productImgId) {
      this.catalogService.deleteproductImg(data.productImgId).subscribe(res => {
        this.sendNotification('Image Deleted');
        this.data.productImg.splice(index, 1);
        console.log('data->', this.data);
        this.terminateSave();
      });
    }
  }

  uploadFloorplanImg(event) {
    if (event.target.files[0]) {
      const fd = new FormData();
      fd.append('FloorPlanImageFile', event.target.files[0]);
      fd.append('ProductId', this.data.productId.toString());
      this.catalogService.uploadFloorplanImg(fd).subscribe(res => {
        console.log('respuesta->', res);
        this.data.floorplanUrl = res.floorplanUrl;
        this.sendNotification('Floorplan Uploaded image');
        this.terminateSave();
      });
    }
  }

  uploadIcon(event) {
    if (event.target.files[0]) {
      const fd = new FormData();
      fd.append('IconFile', event.target.files[0]);
      fd.append('ProductId', this.data.productId.toString());
      this.catalogService.uploadIcon(fd).subscribe(res => {
        this.data.iconUrl = res.iconUrl;
        this.sendNotification('Icon Uploaded');
        this.terminateSave();
      });
    }
  }

  uploadMainPictureImg(event) {
    if (event.target.files[0]) {
      const fd = new FormData();
      fd.append('ProductImageFile', event.target.files[0]);
      fd.append('ProductId', this.data.productId.toString());
      fd.append('MainImg', true.toString());
      this.catalogService.uploadProductImg(fd).subscribe((res: ProductImg) => {
        this.data.mainProductImg = res;
        const index = this.data.productImg.findIndex(home => home.mainImg === true);
        if (index !== -1) {
          this.data.productImg.splice(index, 1);
        }
        this.data.productImg.push(res);

        this.sendNotification('Main Picture Uploaded');
        this.terminateSave();
      });
    }
  }

  uploadProductImg(event) {
    if (event.target.files[0]) {
      const fd = new FormData();
      fd.append('ProductImageFile', event.target.files[0]);
      fd.append('ProductId', this.data.productId.toString());
      fd.append('MainImg', false.toString());
      this.catalogService.uploadProductImg(fd).subscribe((res: ProductImg) => {
        this.data.productImg.push(res);
        this.sendNotification('Product Image Uploaded');
        this.terminateSave();
      });
    }
  }

  showModal(url: string, iframe: boolean) {
    this.userService.showModal(url, iframe);
  }

}
