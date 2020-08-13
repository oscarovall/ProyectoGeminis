import { environment } from './../../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { AppConfig } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Home } from '../../models/crm/Home';
import { Lead } from '../../models/crm/lead';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Home-edit
  public selectedHome: Home;
  public selectedHomeChanged: EventEmitter<Home> = new EventEmitter<Home>();
  public orderHomeSelected: EventEmitter<Home> = new EventEmitter<Home>();

  // Lead
  public selectedLead: Lead;
  public selectedLeadChanged: EventEmitter<Lead> = new EventEmitter<Lead>();


  constructor(private http: HttpClient, private config: AppConfig) { }


  ////////////////////////////////////////////
  ///           Home-Detail                ///
  ////////////////////////////////////////////
  setSelectedHome(home: Home) {
    this.selectedHome = home;
    this.selectedHomeChanged.emit(this.selectedHome);
  }
  setSelectedLead(lead: Lead) {
    this.selectedLead = lead;
    this.selectedLeadChanged.emit(this.selectedLead);
  }
  orderHomeClicked(home: Home) {
    this.orderHomeSelected.emit(home);
  }

  getProduct(pageSize: number, currentPage: number, filterWords: Array<string>) {
    let SearchKeywords = '';
    if (filterWords) {
      filterWords.forEach(word => {
        SearchKeywords = SearchKeywords + `&SearchKeywords=${word}`;
      });
    }
    const data = `PageSize=${pageSize}&CurrentPage=${currentPage}${SearchKeywords}`;
    const url = `${environment.api}ProductInv/getProductsInv?${data}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Promo Homes - pagination',
            text: err.message
          });
          return [];
        })
      );
  }


  filterInventory() {
    const url = environment.api + 'ProductInv/get-options-for-product-inv-status';

    return this.http.get(url)

      .pipe(
        catchError((err: any) => {
          console.log(err);
          return [];
        })
      );
  }

  getAllLots() {
    const url = `${environment.api}Stores/get-all-lots`;
    return this.http.get<any>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all Lots',
            text: err.message
          });
          return [];
        })
      );
  }
}


