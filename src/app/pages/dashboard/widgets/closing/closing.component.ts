import { Component, OnInit } from '@angular/core';
import { Lead } from '../../../../models/crm/Lead';
import { ClosingService } from '../../../../services/service.index';


@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.css']
})
export class ClosingComponent implements OnInit {

  closing: Lead[];
  countlead = 1;
  cargando: boolean = true;

  constructor(
    public _Closing: ClosingService) { }

  ngOnInit() {
    this.cargarClosing();
  }

  cargarClosing() {
    this.cargando = true;
    this._Closing.closing()
      .subscribe(weekClosing => {
        this.closing = weekClosing;
        this.cargando = false;
      });
  }

  countLeads(count) {
    this.countlead = count;
  }

}
