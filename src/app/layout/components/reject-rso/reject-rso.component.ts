import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


//opciones
import { LeadsService, UserService } from '../../../services/service.index';
import { LeadStatus } from '../../../models/leadStatus';
import { ProductInv } from '../../../models/crm/ProductInv';


@Component({
  selector: 'app-reject-rso',
  templateUrl: './reject-rso.component.html',
  styleUrls: ['./reject-rso.component.css']
})
export class RejectRsoComponent implements OnInit {


  leadsStatus: LeadStatus[];
  product: ProductInv[] = [];

  constructor(
    public dialogRef: MatDialogRef<RejectRsoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public leadsService: LeadsService)
  {

  
  }

  ngOnInit() {
    this.leadsStatus = [];
    this.leadsService.getLeadStatus().subscribe((leadsStatus: LeadStatus[]) => {
      console.log('leadsStatus', leadsStatus);
      this.leadsStatus = leadsStatus;
    });

    this.product = [];
    this.leadsService.productInvAvailable().subscribe(result => {
      console.log('Product Invent', result);
      this.product = result.results;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveButton() {

  }

  closeButton() {
    this.dialogRef.close();
  }

}
