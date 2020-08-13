import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../../../services/leads/leads.service';
import Swal from 'sweetalert2';
import { ChangeHomeRsoComponent } from '../../../layout/components/change-home-rso/change-home-rso.component';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { RejectRsoComponent } from '../../../layout/components/reject-rso/reject-rso.component';



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
  constructor(
    private leadsService: LeadsService, public dialog: MatDialog,
    public modalDialog: MatDialog
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

  approve() {

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
        Swal.fire(
          'Approved!',
          'Your choice has been registered. Look for the home at the respective Customer.',
          'success'
        )
      }
    })

  }

  reject() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '368px';
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    const dialogRef = this.dialog.open(ChangeHomeRsoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(comment => {
      console.log('The dialog was closed', comment);

    });

  }

  changeHome() {

    const modalConfig = new MatDialogConfig();
    modalConfig.width = '400px';
    modalConfig.scrollStrategy = new NoopScrollStrategy();

    const modalRef = this.modalDialog.open(RejectRsoComponent, modalConfig);
    modalRef.afterClosed().subscribe(result => {
      this.closeModalStep(result);
      console.log('The dialog was closed', result);
    });
  }


  closeModalStep(result) {
    console.log('The step dialog was closed: ', result);
  
  }
}
