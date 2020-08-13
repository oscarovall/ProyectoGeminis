import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { UserAuthAosp } from '../../../models/auth-aosp/user-auth-aosp';
import { AppConfig } from '../../../app.config';
import { UserService } from '../../../services/service.index';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  employees: UserAuthAosp[] = [];
  totalPages: number;
  pageSize: number = 10;
  currentPage: number = 1;

  isLoading = false;

  constructor(private usrService: UserService, private appConfig: AppConfig) {
    this.changePage(this.currentPage);
    this.usrService.userCreatedOrUpdate.subscribe(result => {
      setTimeout(() => {
        this.changePage(this.currentPage);
      }, 0);
    });
  }

  ngOnInit() {
  }

  changePage(page) {
    this.employees.length = 0;
    this.isLoading = true;
    this.usrService.getUsers(this.currentPage, this.pageSize)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(
        result => {
          this.totalPages = 0;
          if (Array.isArray(result.users) && result.users.length > 0) {
            this.totalPages = result.pageCount * 10;
            for (const user of result.users) {
              this.employees.push({
                email: user.employeeEmail,
                employeeId: user.employeeId,
                employeeName: user.employeeName,
                employeePhone: user.employeePhone,
                employeeActive: user.employeeActive,
                employeeImageUrl: user.employeeImageUrl,
                rolId: user.employeeRoleId,
                rolName: user.employeeName,
                storeName: user.employeeRoleName,
                storelId: user.employeeStoreId,
                teamMembers: [],
              });
            }
          }
        }, error => {

        });
  }

  changePageSize() {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  }

  addNewUser() {
    const newEmployee = new UserAuthAosp();
    this.usrService.setSelectedUserAdmin(newEmployee);
    this.usrService.showHideRightMenu(this.appConfig.rightMenu.profile);
  }

  resetPassword(employee: Employee) {

  }

  editUser(employee: UserAuthAosp) {
    this.usrService.setSelectedUserAdmin(employee);
    this.usrService.showHideRightMenu(this.appConfig.rightMenu.profile);
  }

}
