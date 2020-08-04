import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/crm/Product';
import { ProductInv } from '../../../../../models/crm/ProductInv';
import { CatalogService } from '../../../../../services/service.index';
import { AppConfig } from '../../../../../app.config';
import { ActivatedRoute, Router } from '@angular/router';
import { Home } from '../../../../../models/crm/Home';
import { UserService } from '../../../../../services/user/user.service';
import { ProductService } from '../../../../../services/Product/product.service';



@Component({
  selector: 'app-promo-homes',
  templateUrl: './promo-homes.component.html',
  styleUrls: ['./promo-homes.component.css']
})
export class PromoHomesComponent implements OnInit {

  result: ProductInv[] = [];
  totalPages: number;
  pageSize: number = 20;
  currentPage: number = 1;
  featureHome: boolean = true;

  slideConfig = { "slidesToShow": 4, "slidesToScroll": 4 };

  constructor(
    public cService: CatalogService,
    public appConfig: AppConfig,
    public aRouter: ActivatedRoute,
    public userService: UserService,
    public productService: ProductService,
    public router: Router) { }

  ngOnInit() {
    this.getProductsPaginate(this.currentPage);
    this.afterChange(this.afterChange);
  }

  getProductsPaginate(currentPage) {
    this.cService.getPromoHomes()
      .subscribe(resp => {
        this.result = resp.results;

      });
  }

  afterChange(e) {
  }

  seeDetail(homeSelected: Home) {
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productDetail);
    setTimeout(() => { this.productService.setSelectedHome(homeSelected); });
  }
}
