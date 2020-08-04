import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { AppConfig } from '../../app.config';
import { AuthService } from '../../services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: Employee;
  currentRole: string;
  constructor(
    private authService: AuthService,
    private appCongig: AppConfig
    ) { }


  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
  
  }
}
