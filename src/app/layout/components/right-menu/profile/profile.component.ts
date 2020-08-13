import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Employee } from '../../../../models/Employee';
import { Store } from '../../../../models/Store';
import { Role } from '../../../../models/Role';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DocUploadComponent } from '../../../../ui/components/file-uploader/doc-upload/doc-upload.component';
import { EmployeeEmployeeTeam } from '../../../../models/EmployeeEmployeeTeam';
import { AuthService, CompanyService, UserService } from '../../../../services/service.index';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  // teamMembers: Array<Employee> = [];
  employee: Employee;
  modeEdit: Boolean = false;
  // saveEvent = new EventEmitter<boolean>();
  // cancelEvent = new EventEmitter<boolean>();
  wasValidated = false;

  // New User
  stores: Store[];
  roles: Role[];
  // New team members
  filteredOptions: Array<Employee>;
  selectedTeamMember: Employee;

  constructor(public userService: UserService, private companyService: CompanyService, private authService: AuthService,
    public docsDialog: MatDialog, private _snackBar: MatSnackBar,private router: Router) {
    this.userService.selectedUserAdminChanged.subscribe((selectedEmployee: Employee) => this.getEmployee());
    this.userService.openRightMenuChange.subscribe((openRightMenu: boolean) => {
      if (!openRightMenu) {
        this.modeEdit = false;
      }
    });
  }
  ngOnInit() {
    this.getEmployee();
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  getEmployee() {
    // this.employee = Object.assign({}, this.employeeData);
    if (this.userService.selectedUserAdmin) {
      this.userService.getRoles().subscribe((roles: Role[]) => this.roles = roles);
      this.companyService.getStores().subscribe((stores: Store[]) => this.stores = stores);
      this.employee = this.userService.selectedUserAdmin;
      this.modeEdit = true;
    } else {
      this.employee = this.authService.getUser();
    }
    console.log('this.employee', this.employee);

    // this.teamMembers = [];
    // if (!this.employee.employeeEmployeeTeamTeamOwner) {
    //   this.employee.employeeEmployeeTeamTeamOwner = [];
    // }
    // this.employee.employeeEmployeeTeamTeamOwner.forEach(member => {
    //   this.teamMembers.push(member.teamMember);
    // });
  }

  ShowHideModeEdit() {
    this.modeEdit = !this.modeEdit;
  }

  // saveClick() {
  //   this.saveEvent.emit(true);

  // }

  cancelClick() {
    if (this.userService.selectedUserAdmin) {
      this.userService.selectedUserAdmin = null;
      this.userService.hideRightMenu();
    } else {
      this.ShowHideModeEdit();
      // this.cancelEvent.emit(true);
    }
  }

  terminateSave() {
    if (this.userService.selectedUserAdmin) {
      this.userService.selectedUserAdmin = null;
      this.userService.hideRightMenu();

    } else {
      this.getEmployee();
      if (this.modeEdit) {
        this.ShowHideModeEdit();
      }
    }
    this.modeEdit = false;
  }

  onKeyUp(event) {
    this.filteredOptions = [];
    console.log('Key up', event.target.value);
    this.filter(event.target.value);
  }

  filter(filterValue: string) {
    if (filterValue.length && filterValue.length >= 3) {
      let listSeach = filterValue.split(' ');
      listSeach = listSeach.filter(el => el !== '');
      listSeach = listSeach.filter(el => el.length !== 1);

      this.userService.getEmployeesFind(listSeach).subscribe((employees: Employee[]) => {
        this.filteredOptions = employees;
      });
    }
  }

  setEmployee(selectedEmployee: Employee) {
    console.log('selectedEmployee', selectedEmployee);
    this.selectedTeamMember = selectedEmployee;
  }

  addTeamMember() {
    if (!this.employee.employeeEmployeeTeamTeamOwner) {
      this.employee.employeeEmployeeTeamTeamOwner = [];
    }
    let exist = false;
    this.employee.employeeEmployeeTeamTeamOwner.forEach((teamMember: EmployeeEmployeeTeam) => {
      if (teamMember.teamMemberId === this.selectedTeamMember.employeeId) {
        exist = true;
      }
    });
    if (exist) {
      this.sendNotification('Team member already exist');
    } else {
      const teamMember = new EmployeeEmployeeTeam();
      if (this.employee.employeeId) {
        teamMember.teamOwnerId = this.employee.employeeId;
      }
      teamMember.teamMemberId = this.selectedTeamMember.employeeId;
      teamMember.teamMember = this.selectedTeamMember;
      this.employee.employeeEmployeeTeamTeamOwner.push(teamMember);
    }
  }

  deleteTeamMember(teamMeber: EmployeeEmployeeTeam, index: number) {
    this.employee.employeeEmployeeTeamTeamOwner.splice(index, 1);
  }

  saveChanges() {
    if (this.employee.cellphone) {
      if (this.form.valid === false) {
        this.wasValidated = true;
      } else {
        this.wasValidated = false;
        // console.log('this.contact', this.employee);

        this.employee.password = 'Aosp123456*';
        this.employee.cellphone = '+573153410481';

        let respAWS;
        if (this.employee.employeeId) {
          respAWS = true;
        } else {
          console.log('authService.signUp', this.employee);
          respAWS = this.authService.signUp(this.employee);
          console.log('respAWS', respAWS);
        }

        if (respAWS) {
          if (this.employee.employeeId) {
            console.log('Updating user', this.employee);
            this.userService.updateEmployee(this.employee).subscribe(() => {
              this.sendNotification('Employee updated');
              this.terminateSave();
            });
          } else {
            console.log('Creating user', this.employee);
            this.userService.createEmployee(this.employee).subscribe((newEmployee: Employee) => {
              this.filteredOptions.push(newEmployee);
              this.sendNotification('Employee created');
              this.terminateSave();
            });
          }
        }
        // this.updateLocalStorage();
      }
    } else {
      this.wasValidated = true;
    }

  }

  changePhoneNumber(event) {
    if (event) {
      this.employee.cellphone = event;
    } else {
      this.employee.cellphone = null;
      this.wasValidated = true;
    }
  }

  uploadDocument(): void {
    const name = this.employee.employeeId;
    const folder = 'employees';

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '368px';
    dialogConfig.data = {
      document: false,
      documentName: name,
      documentFolder: folder,
    };
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    const docRef = this.docsDialog.open(DocUploadComponent, dialogConfig);
    docRef.afterClosed().subscribe(result => {
      console.log('Result', result);

      if (result && result.ok) {
        const extention = result.fileName.split('.').pop();
        const URL = `https://aosp-userdata-test-virginia.s3.amazonaws.com/MHOT/${folder}/${name}.${extention}`;
        this.employee.imageUrl = URL;
         // this.userService.updateEmployee(this.employee).subscribe( res => {
          // this.updateLocalStorage();
         // });
      }
    });
  }

   updateLocalStorage() {
     // this.userService.getEmployeeById(this.employee.employeeId).subscribe((employee: Employee) => {
      this.authService.setUser(JSON.stringify(this.employee));
        // this.saveDone.emit(true);
     // });
   }

   logout(): void {
    setTimeout(() => {
      this.router.navigate(['/auth/log-out']);
    }, 0);
   }
}
