import { Component, OnInit } from '@angular/core';
import { AuthService, LeadsService, UserService } from '../../../services/service.index';
import { Router } from '@angular/router';
import { AppConfig } from '../../../app.config';
import { ProductService } from '../../../services/Product/product.service';
import { Product } from '../../../models/crm/Product';
import { Home } from '../../../models/crm/home';



@Component({
  selector: 'app-promo-houses',
  templateUrl: './promo-houses.component.html',
  styleUrls: ['./promo-houses.component.css']
})
export class PromoHousesComponent implements OnInit {


  promoHome: Product[] = [];
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
  )
  {
    this.getProduct(this.currentPage);
    this.changePage(this.currentPage);
  }

  ngOnInit() {
   
  }
   

  getProduct(currentPage) {

    this.cargando = true;

    this._productService.getProduct(this.pageSize, currentPage, [])
      .subscribe((pagination: any) => {
        this.totalPages = pagination.pageCount * 10;
        this.promoHome = pagination.results;
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

  seeDetail(homeSelected: Home) {
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productDetail);
    setTimeout(() => { this.productService.setSelectedHome(homeSelected); });
  }

}
