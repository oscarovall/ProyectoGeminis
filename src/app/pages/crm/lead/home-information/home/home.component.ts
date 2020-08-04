import { Component, OnInit } from '@angular/core';
import { Home } from '../../../../../models/crm/home';
import { ProductService } from '../../../../../services/Product/product.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home: Home;

  constructor(
    private productService: ProductService) {

   
    }

  ngOnInit() {
  }
 
}
