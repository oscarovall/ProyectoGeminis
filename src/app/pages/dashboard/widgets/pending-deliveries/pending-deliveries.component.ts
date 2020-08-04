import { Component, OnInit } from '@angular/core';
import { Lead } from '../../../../models/crm/Lead';
import { DeleveriesService } from '../../../../services/service.index';
import { PendingDeliverys } from '../../../../models/crm/PendingDeliverys';



@Component({
  selector: 'app-pending-deliveries',
  templateUrl: './pending-deliveries.component.html',
  styleUrls: ['./pending-deliveries.component.css']
})
export class PendingDeliveriesComponent implements OnInit {

  deliverys: PendingDeliverys;
  cargando: boolean = true;


  constructor(
    public _deleveries: DeleveriesService) { }

  ngOnInit() {
    this.cargarDeliverys()
  }

  cargarDeliverys() {
    this.cargando = true;
    this._deleveries.deliverys()
      .subscribe(deliverys => {
        this.deliverys = deliverys;
        this.cargando = false;
      });
  }

}
