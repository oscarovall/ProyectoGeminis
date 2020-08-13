import { Component, OnInit } from '@angular/core';
import { AppConfig } from './../../../app.config';
import { Lead } from '../../../models/crm/Lead';
import { AuthService, LeadsService, UserService } from '../../../services/service.index';
import { Router } from '@angular/router';
import { LeadStatus } from '../../../models/leadStatus';
import { Home } from '../../../models/crm/home';
import { ProductService } from '../../../services/Product/product.service';
import { Product } from '../../../models/crm/Product';
import { ProductInv } from '../../../models/crm/ProductInv';


@Component({
  selector: 'app-home-delivery',
  templateUrl: './home-delivery.component.html',
  styleUrls: ['./home-delivery.component.css']
})
export class HomeDeliveryComponent implements OnInit {

  leads: Lead[]=[];
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;
  IdStatus: number = 2;
  cargando: boolean = true;
  product: ProductInv[] = [];
  inventory: Product[] = [];
  selectedLead: Lead;
  estados: Product[] = [];

  constructor(
    private authService: AuthService,
    private leadService: LeadsService,
    private router: Router,
    public appConfig: AppConfig,
    public userService: UserService,
    public productService: ProductService) {

    this.getLeadStatus(this.currentPage);
    this.changePage(this.currentPage);

  }

  ngOnInit() {
  }


  getLeadStatus(currentPage) {

    this.cargando = true;

    this.leadService.getLeadByStatus(this.IdStatus, this.pageSize, currentPage)
      .subscribe((pagination: any) => {
        console.log('Home Delivery', pagination);
        this.totalPages = pagination.pageCount * 10;
        this.leads = pagination.results;
        this.cargando = false;
      });
  }

  changePage(currentPage) {
    this.currentPage = currentPage;
    this.getLeadStatus(currentPage);
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
