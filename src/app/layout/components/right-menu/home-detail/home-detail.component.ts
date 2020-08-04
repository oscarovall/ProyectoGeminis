import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/Product/product.service';
import { Home } from '../../../../models/crm/Home';
import { UserService } from '../../../../services/user/user.service';
import { HomesOrderInput } from '../../../../models/crm/HomesOrderInput';
import { Lead } from '../../../../models/crm/lead';
import { LeadsService } from '../../../../services/leads/leads.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit {

  home: Home;
  lead: Lead;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private leadsService: LeadsService,
    private _snackBar: MatSnackBar
  ) {
    this.home = this.productService.selectedHome;
    this.productService.selectedHomeChanged.subscribe((home: Home) => {
      this.home = home;
    });
  }

  ngOnInit() {

  }

  showModal(url: string, iframe: boolean) {
    this.userService.showModal(url, iframe);
  }

  orderHomes() {
    this.productService.orderHomeClicked(this.home);
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }
}
