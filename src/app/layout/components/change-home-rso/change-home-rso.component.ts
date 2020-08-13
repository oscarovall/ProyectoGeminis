import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeadsService, UserService } from '../../../services/service.index';
import { ProductInv } from '../../../models/crm/ProductInv';
import { Lead } from '../../../models/crm/lead';



@Component({
  selector: 'app-change-home-rso',
  templateUrl: './change-home-rso.component.html',
  styleUrls: ['./change-home-rso.component.css']
})
export class ChangeHomeRsoComponent implements OnInit {

  product: ProductInv[] = [];
  comments: String;
  wasValidated = false;
  estadoSelected: null;

  constructor(public dialogRef: MatDialogRef<ChangeHomeRsoComponent>,
    public userService: UserService,
    public leadsService: LeadsService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

  closeButton() {
    this.dialogRef.close();
  }

  saveButton() {
   
    console.log(this.estadoSelected, 'selected Reject');
    console.log("vleadId-->", this.data.vleadId);
    console.log("vworkflowId-->", this.data.vworkflowId);
    console.log("vproductInvId-->", this.data.vproductInvId);

    this.leadsService.rejectRso(this.data.vleadId, this.data.vworkflowId, this.data.vproductInvId, this.estadoSelected)
      .subscribe(resp => {
        console.log(resp, 'Prueba de Approve');
      })

    this.dialogRef.close(this.estadoSelected);

  }
}
