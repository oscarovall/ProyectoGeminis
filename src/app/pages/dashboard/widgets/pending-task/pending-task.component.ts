import { Component, OnInit } from '@angular/core';
import { AppointmentEmployee } from '../../../../models/crm/AppoinmentEmployee';
import { PendingTaskService } from '../../../../services/service.index';
import { CountPendingTask } from '../../../../models/crm/CountPendingTask';



@Component({
  selector: 'app-pending-task',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.css']
})
export class PendingTaskComponent implements OnInit {

  pendings: CountPendingTask;
  cargando: boolean = true;

  constructor(
    public _pendingTask: PendingTaskService) { }

  ngOnInit() {

    this.cargarPending();
  }

  cargarPending() {
      this.cargando = true;
    this._pendingTask.pendingTask()
      .subscribe(pendings => {
        this.pendings = pendings;
         this.cargando = false;
      });
  }

}
