import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../../models/Role';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { UserService, RoleService } from '../../../../services/service.index';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  @ViewChild('f', null) form: NgForm;
  wasValidated = false;
  role: Role;
  tilte = 'Add';

  constructor(public usrService: UserService, private _snackBar: MatSnackBar) {
    this.usrService.selectedRoleAdminChanged.subscribe((selectedRole: Role) => this.getRole());
  }

  ngOnInit() {
    this.getRole();
  }

  getRole() {
    if (this.usrService.selectedRoleAdmin) {
      this.role = this.usrService.selectedRoleAdmin;
      console.log('Editar:', this.role);
      if (this.role.roleId || this.role.roleId === 0) {
        this.tilte = 'Edit';
      } else {
        this.tilte = 'Add';
      }
    } else {
      console.log('No role selected');
    }
  }

  cancel() {
    if (this.usrService.selectedRoleAdmin) {
      this.usrService.selectedRoleAdmin = null;
      this.usrService.hideRightMenu();
    } else {
      console.log('No role selected');
    }
  }

  saveRole() {
    if (this.form.valid === false) {
      this.wasValidated = true;
    } else {
      this.wasValidated = false;

      if (this.role.roleId) {
        console.log('updating role', this.role);
        this.usrService.updateRole(this.role).subscribe((newRole: Role) => {
          this.usrService.setSelectedRoleAdmin(newRole);
          this.sendNotification('Role updated');
          this.terminateSave();
        });
      } else {
        console.log('creating role', this.role);
        this.usrService.createRole(this.role).subscribe((newRole: Role) => {
          this.usrService.setSelectedRoleAdmin(newRole);
          this.sendNotification('Role created');
          this.terminateSave();
        });
      }
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    if (this.usrService.selectedRoleAdmin) {
      this.usrService.selectedRoleAdmin = null;
      this.usrService.hideRightMenu();

    } else {
      console.log('No role selected');
    }
  }

}
