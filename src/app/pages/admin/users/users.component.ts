import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { AppConfig } from '../../../app.config';
import { UserService } from '../../../services/service.index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  employees: Employee[];
  totalPages: number;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private usrService: UserService, private appConfig: AppConfig) {
    this.changePage(this.currentPage);
  }

  ngOnInit() {
  }

  changePage(page) {
    console.log('Page', page);
    this.usrService.getAllEmployees(this.pageSize, page).subscribe((pagination) => {
      this.totalPages = pagination.pageCount * 10;
      this.employees = pagination.results;

    });
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  addNewUser() {
    const newEmployee = new Employee();
    newEmployee.employeeStatusId = this.appConfig.employeeStatus.offline;
    this.usrService.setSelectedUserAdmin(newEmployee);
    this.usrService.showHideRightMenu(this.appConfig.rightMenu.profile);
  }

  resetPassword(employee: Employee) {

  }

  editUser(employee: Employee) {
    this.usrService.setSelectedUserAdmin(employee);
    this.usrService.showHideRightMenu(this.appConfig.rightMenu.profile);
  }

}
