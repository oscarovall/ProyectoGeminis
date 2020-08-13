import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

//opciones
import { LeadsService, UserService } from '../../../services/service.index';
import { LeadStatus } from '../../../models/leadStatus';
import { ProductInv } from '../../../models/crm/ProductInv';
import { Lead } from '../../../models/crm/lead';


@Component({
  selector: 'app-reject-rso',
  templateUrl: './reject-rso.component.html',
  styleUrls: ['./reject-rso.component.css']
})
export class RejectRsoComponent implements OnInit {

  product: ProductInv[] = [];
  estadoSelected: any;
  prueba: Lead;
  pruebas: ProductInv;

  constructor(
    public dialogRef: MatDialogRef<RejectRsoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public leadsService: LeadsService)
  {

  }

  ngOnInit() {
  
    this.product = [];
    this.leadsService.productInvAvailable().subscribe(result => {
      console.log('Product Invent', result);
      this.product = result.results;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveButtonChange() {
    console.log(this.estadoSelected, 'selected');

    console.log("leadId-->", this.data.vleadId)
    console.log("vworkflowId-->", this.data.vworkflowId)

    this.dialogRef.close(this.estadoSelected);

    this.leadsService.ChangeHomeRso(this.data.vleadId, this.data.vworkflowId, this.estadoSelected)
      .subscribe(resp => {
        console.log(resp, 'Prueba de Approve');
      })
  }

  closeButton() {
    this.dialogRef.close();
  }

}
