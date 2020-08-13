import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../../../services/leads/leads.service';
import Swal from 'sweetalert2';
import { ChangeHomeRsoComponent } from '../../../layout/components/change-home-rso/change-home-rso.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { RejectRsoComponent } from '../../../layout/components/reject-rso/reject-rso.component';
import { ProductInv } from '../../../models/crm/ProductInv';
import { Home } from '../../../models/crm/home';
import { UserService } from '../../../services/service.index';
import { AppConfig } from '../../../app.config';
import { ProductService } from '../../../services/Product/product.service';
import { Product } from '../../../models/crm/Product';
import { Lead } from '../../../models/crm/lead';



@Component({
  selector: 'app-pending-rso',
  templateUrl: './pending-rso.component.html',
  styleUrls: ['./pending-rso.component.css']
})
export class PendingRsoComponent implements OnInit {

  pendingRso;
  totalPages: number;
  pageSize: number = 5;
  currentPage: number = 1;
  product: ProductInv[] = [];
  inventory: Product[] = [];
  estados: Product[] = [];
  cargando: boolean = true;
  selectedLead: Lead; 

  constructor(
    private leadsService: LeadsService, public dialog: MatDialog,
    public modalDialog: MatDialog,
    public userService: UserService,
    public appConfig: AppConfig,
    public productService: ProductService
    

  ) {
    this.getPendingRso(this.currentPage);
  }

  ngOnInit() {
  }

  changePage(currentPage) {
    this.getPendingRso(currentPage);
  }


  getPendingRso(currentPage) {
    this.leadsService.getPendingRso(this.pageSize, currentPage).subscribe((response) => {
      this.totalPages = response.pageCount * 10;
      this.pendingRso = response.results;
      console.log(response, 'Pending RSO');
    });
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  approve(leadId: number, workflowId: number, productInvId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to approve this RSO",
      icon: 'success',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#6ca100',
      confirmButtonText: 'Approve'
    }).then((result) => {
      if (result.value) {
        this.leadsService.approveRso(leadId, workflowId, productInvId)
          .subscribe(resp => {
            console.log(resp, 'Prueba de Approve'); 
        })

        Swal.fire(
          'Approved!',
          'Your choice has been registered. Look for the home at the respective Customer.',
          'success'
        )
      }
    })

  }

  reject(leadId: number, workflowId: number, productInvId: number, rsoRejectedReason: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '368px';
    dialogConfig.scrollStrategy = new NoopScrollStrategy();
    //Se obtiene la data de la función y se envia al componente del modal.
    dialogConfig.data = { vleadId: leadId, vworkflowId: workflowId, vproductInvId: productInvId, vrsoRejectedReason: rsoRejectedReason }

    const dialogRef = this.dialog.open(ChangeHomeRsoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

    });

  }

  changeHome(leadId: number, workflowId: number) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.scrollStrategy = new NoopScrollStrategy();
    dialogConfig.data = { vleadId: leadId, vworkflowId: workflowId};

    const modalRef = this.modalDialog.open(RejectRsoComponent, dialogConfig);

    modalRef.afterClosed().subscribe(result => { 
  
     });

  }


  closeModalStep(result) {
    console.log('The step dialog was closed: ', result);
  
  }
   
  seeDetail(homeSelected: Home) {
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productDetail);
    setTimeout(() => { this.productService.setSelectedHome(homeSelected); });
  }

}
