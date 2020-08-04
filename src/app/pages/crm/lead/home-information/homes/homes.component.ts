import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/crm/Product';
import { ProductInv } from '../../../../../models/crm/ProductInv';
import { CatalogService } from '../../../../../services/service.index';
import { AppConfig } from '../../../../../app.config';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  results: Product[] = [];
  result: ProductInv[] = [];
  totalPages: number;
  pageSize: number = 20;
  currentPage: number = 1;

  constructor(
    public cService: CatalogService,
    public appConfig: AppConfig,
    public aRouter: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
  }

}
