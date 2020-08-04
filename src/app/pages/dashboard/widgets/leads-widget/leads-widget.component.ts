import { Component, OnInit } from '@angular/core';
import { StatusLeadsService, AuthService } from '../../../../services/service.index';
import { Lead } from '../../../../models/crm/Lead';


@Component({
  selector: 'app-leads-widget',
  templateUrl: './leads-widget.component.html',
  styleUrls: ['./leads-widget.component.scss']
})
export class LeadsWidgetComponent implements OnInit {

  estadosLeads: Lead[] = [];
  countlead = 6;
  cargando: boolean = true;

  constructor(
    private authService: AuthService,
    public _statusLeadsService: StatusLeadsService

  ) { }

  ngOnInit() {

    this.cargarEstadosLeads();
  }

  cargarEstadosLeads() {
    this.cargando = true;
    this._statusLeadsService.cargarEstadosLeads()
      .subscribe(estadosLeads => {
        this.estadosLeads = estadosLeads;
        this.cargando = false;
      });
  }

  countLeads(count) {
    this.countlead = count;
  }
}
