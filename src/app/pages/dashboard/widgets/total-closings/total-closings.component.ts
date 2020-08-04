import { Component, OnInit } from '@angular/core';
import { Lead } from '../../../../models/crm/Lead';
import { TotalClosingService } from '../../../../services/top-widgets/totalClosing/total-closing.service';


@Component({
  selector: 'app-total-closings',
  templateUrl: './total-closings.component.html',
  styleUrls: ['./total-closings.component.css']
})
export class TotalClosingsComponent implements OnInit {

  total: Lead[];
  countlead = 0;
  cargando: boolean = true;

  constructor(
    public _totalClosing: TotalClosingService) { }

  ngOnInit() {
    this.cargarTotalClosing();
  }

  cargarTotalClosing() {
    this.cargando = true;
    this._totalClosing.totalClosing()
      .subscribe(totalClosing => {
        this.total = totalClosing;
        this.cargando = false;
      });
  }

  countLeads(count) {
    this.countlead = count;
  }
}
