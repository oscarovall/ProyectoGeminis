import { Component, OnInit } from '@angular/core';
import { LeadsService } from '../../../services/leads/leads.service';

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
    private leadsService: LeadsService
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
    });
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  approve() { }
  reject() { }

}
