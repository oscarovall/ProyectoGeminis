import { Component, OnInit } from '@angular/core';
import { Lead } from '../../../../models/crm/Lead';
import { DealsService } from '../../../../services/top-widgets/deals/deals.service';


@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  deals: Lead[] = [];
  countDeal = 5;
  cargando: boolean = true;

  constructor(
    public _dealService: DealsService) { }

  ngOnInit() {
    this.cargarDeals();
  }

  cargarDeals() {
    this.cargando = true;
    this._dealService.deals()
      .subscribe(listaDeals => {
        this.deals = listaDeals;
        this.cargando = false;
      });
  }

  countLeads(count) {
    this.countDeal = count;
  }

}
