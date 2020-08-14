import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/crm/Product';
import { Employee } from '../../../models/Employee';
import { ProductInvAvailableStatus } from '../../../models/crm/ProductInvAvailableStatus';
import { AuthService } from '../../../services/auth/auth.service';
import { LeadsService } from '../../../services/leads/leads.service';
import { Router } from '@angular/router';
import { AppConfig } from '../../../app.config';
import { ProductService } from '../../../services/Product/product.service';
import icons from 'glyphicons';
import { Home } from '../../../models/crm/Home';
import { UserService } from '../../../services/user/user.service';
import { ProductInv } from '../../../models/crm/ProductInv';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {

  inventory: ProductInv[] = [];
  estados: Product[] = [];
  teamMembers: Employee[];
  productInvAvailableStatus: ProductInvAvailableStatus[] = [];
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;
  cargando: boolean = true;
  arrayWords: Array<string>;
  wordsFilter: string;

  constructor(
    private authService: AuthService,
    private leadService: LeadsService,
    private router: Router,
    public appConfig: AppConfig,
    public _productService: ProductService,
    public userService: UserService,
    public productService: ProductService

  ) {
    this.getProduct();
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

  getProduct() {
    this.cargando = true;
    this._productService.getProduct(this.pageSize, this.currentPage, this.arrayWords).subscribe((pagination: any) => {
      this.totalPages = pagination.pageCount * 10;
      this.cargando = false;
      this.inventory = pagination.results;
    });
  }

  changePage(currentPage) {
    this.currentPage = currentPage;
    this.getProduct();

  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  filterStatusInventory() {
    this._productService.filterInventory()
      .subscribe(result => {
        this.estados = result.results;
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

  /* -- Filter By Words -- */
  onKeyUp(words) {
    this.currentPage = 1;
    if (words && words !== '') {
      this.filter(words);
    } else {
      this.arrayWords = [];
      this.getProduct();
    }
  }

  filter(filterValue: string) {
    if (filterValue.length && filterValue.length >= 3) {
      let arreglo = filterValue.split(' ');
      arreglo = arreglo.filter(el => el !== '');
      arreglo = arreglo.filter(el => el.length !== 1);
      this.arrayWords = arreglo;
      this.getProduct();
    }
  }
  /* -- End Filter By Words -- */

  addStockHome() {
    const newProduct = new ProductInv();
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productInv);
    setTimeout(() => { this.productService.setSelectedHomeInv(newProduct); });
  }

  editHome(homeSelected: ProductInv) {
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productInv);
    setTimeout(() => { this.productService.setSelectedHomeInv(homeSelected); });
  }

  /* seeDetail(homeSelected: ProductInv) {
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productInv);
    setTimeout(() => { this.productService.setSelectedHome(homeSelected); });
  } */
}
