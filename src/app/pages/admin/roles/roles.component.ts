import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/Role';
import { RolePage } from '../../../models/RolePage';
import { RolePermission } from '../../../models/RolePermission';
import { AppConfig } from '../../../app.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService, RoleService } from '../../../services/service.index';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles: Role[];
  pages: RolePage[];
  permissions: RolePermission[];
  constructor(private usrService: UserService, private roleService: RoleService, private config: AppConfig,
    private _snackBar: MatSnackBar) {
      this.usrService.selectedRoleAdminChanged.subscribe((selectedRole: Role) => this.getRoles());
    this.getPages();
    this.getRoles();
  }

  ngOnInit() {
  }

  getRoles() {
    this.usrService.getRoles().subscribe((results) => {
      this.roles = results;
    });
  }

  getPages() {
    this.roleService.getPages().subscribe((resPages: RolePage[]) => {
      this.pages = resPages;
    });
  }

  addNewRole() {
    const newRole = new Role();
    this.usrService.setSelectedRoleAdmin(newRole);
    this.usrService.showHideRightMenu(this.config.rightMenu.role);
  }

  edit(role: Role) {
    this.usrService.setSelectedRoleAdmin(role);
    this.usrService.showHideRightMenu(this.config.rightMenu.role);
  }

  pipeRoles(page: RolePage, role: Role, permission: string) {
    if (role.rolePermission && role.rolePermission.length > 0) {
      const rolePermission = role.rolePermission.find(rp => rp.roleId === role.roleId && rp.rolePageId === page.rolePageId);
      if (rolePermission && rolePermission.permission === permission) {
        return 'active';
      } else if (!rolePermission && permission === 'none') {
        return 'active';
      }
    } else {
      if (permission === 'none') {
        return 'active';
      }
    }
  }

  savePermission(page: RolePage, role: Role, permission: string) {
    const rolePermission = role.rolePermission.find(rp => rp.roleId === role.roleId && rp.rolePageId === page.rolePageId);
    if (rolePermission && rolePermission.roleId) {
      rolePermission.permission = permission;
      this.usrService.updateRolePermission(rolePermission).subscribe((newrp: RolePermission) => {
        this.sendNotification('Updated Role Permission');
        this.terminateSave();
      });
    } else {
      const rPermission = new RolePermission();
      rPermission.permission = permission;
      rPermission.roleId = role.roleId;
      rPermission.rolePageId = page.rolePageId;
      this.usrService.createRolePermission(rPermission).subscribe((newrp: RolePermission) => {
        this.sendNotification('Created Role Permission');
        this.terminateSave();
      });
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  terminateSave() {
    this.getRoles();
  }
}
