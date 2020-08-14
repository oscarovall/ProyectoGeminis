import { Component, OnInit } from '@angular/core';
import { AuthService, LeadsService, UserService } from '../../../services/service.index';
import { Router } from '@angular/router';
import { AppConfig } from '../../../app.config';
import { ProductService } from '../../../services/Product/product.service';
import { Product } from '../../../models/crm/Product';
import { ProductInvAvailableStatus } from '../../../models/crm/ProductInvAvailableStatus';
import { Employee } from './../../../models/Employee';
import { Home } from '../../../models/crm/home';
import { ProductInv } from '../../../models/crm/ProductInv';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  estadoSelected = null;
  estadoSelected2 = null;

  inventory: ProductInv[] = [];
  estados: Product[] = [];
  availableStatusList: Product[] = [];
  usedStatusList: Product[] = [];
  teamMembers: Employee[];
  productInvAvailableStatus: ProductInvAvailableStatus[] = []; 
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;
  cargando: boolean = true;
 

  constructor(
    private authService: AuthService,
    private leadService: LeadsService,
    private router: Router,
    public appConfig: AppConfig,
    public _productService: ProductService,
    public userService: UserService,
    public productService: ProductService

  ) {
    this.getProduct(this.currentPage);
    this.changePage(this.currentPage);
    this.getTeamMembers();
  }


  ngOnInit() {
    this.filterStatusInventory();
  }

  getTeamMembers() {
    const id = this.authService.getUser().employeeId ? this.authService.getUser().employeeId : 3;
    this.leadService.getTeamMembers(id).subscribe((employeeList) => {
      this.teamMembers = employeeList;
    });
  }

  getProduct(currentPage) {
    this.cargando = true;
    this._productService.getProduct(this.pageSize, currentPage, [])
      .subscribe((pagination: any) => {
        this.totalPages = pagination.pageCount * 10;
        if (this.estadoSelected && this.estadoSelected2) {
          this.inventory = [];
          pagination.results.forEach(productTmp => {
            if (productTmp.productInvAvStatus.name == this.estadoSelected2.name &&
              productTmp.productInvUsedStatus.name == this.estadoSelected.name) {
              this.inventory.push(productTmp);
              console.log(productTmp, this.inventory)
            }
9          })
   
        } else {
          this.inventory = pagination.results;
        }
      
        this.cargando = false;
      });
  }



  changePage(currentPage) {
    this.currentPage = currentPage;
    this.getProduct(currentPage);
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  filterStatusInventory() {
    this._productService.filterInventory()
      .subscribe(result => {
        this.estados = result.results;
        this.availableStatusList = result.availableStatusList;
        this.usedStatusList = result.usedStatusList;
      })
  }

  pipeStatus(name: string) {
    if (name === this.appConfig.productInvAvStatus.available) {
      return 'success'; 
    } if (name === this.appConfig.productInvAvStatus.sold) {
      return 'warning';
    }
    if (name === this.appConfig.productInvAvStatus.onOnrder) {
      return 'primary';
    }
    if (name === this.appConfig.productInvAvStatus.offline) {
      return 'secondary';
    }
    if (name === this.appConfig.productInvAvStatus.model) {
      return 'info';
    }
  }

  seeDetail(homeSelected: Home) {
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productDetail);
    setTimeout(() => { this.productService.setSelectedHome(homeSelected); });
  }

}
