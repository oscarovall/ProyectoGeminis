import { environment } from './../../../environments/environment';
import { Employee } from './../../models/Employee';
import { AppConfig } from './../../app.config';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../models/Role';
import { UserAuthAosp } from '../../models/auth-aosp/user-auth-aosp';

import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { isThisSecond } from 'date-fns';
import { RolePermission } from '../../models/RolePermission';
import { Template } from '../../models/Template';
import { LeadDocument } from '../../models/crm/LeadDocument';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Modal
  public openModal = false;
  public contentModal: string;
  public contentModal1: string;
  public iframeModal: boolean;
  public textModal: boolean;

  public openModalChange = new EventEmitter<boolean>();

  public openModalQualifyChange = new EventEmitter<boolean>();

  // Right Menu
  public openRightMenu = false;
  public contentRightMenu: string;
  public openRightMenuChange = new EventEmitter<boolean>();

  // Profile Admin
  public selectedUserAdmin: UserAuthAosp;
  public modeEditAdmin = false;
  public selectedUserAdminChanged: EventEmitter<UserAuthAosp> = new EventEmitter<UserAuthAosp>();

  // Profile Rol
  public selectedRoleAdmin: Role;
  public selectedRoleAdminChanged: EventEmitter<Role> = new EventEmitter<Role>();
  public selectedRoleAdminSaved: EventEmitter<Role> = new EventEmitter<Role>();
  public userCreatedOrUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Template
  public selectedTemplate: Template;
  public selectedTemplateChanged: EventEmitter<Role> = new EventEmitter<Role>();
  public selectedTemplateSaved: EventEmitter<Role> = new EventEmitter<Role>();


  // forms
  public selectedForm: LeadDocument;
  public selectedFormChanged: EventEmitter<LeadDocument> = new EventEmitter<LeadDocument>();
  public selectedFormSaved: EventEmitter<LeadDocument> = new EventEmitter<LeadDocument>();

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }

  ////////////////////////////////////////////
  //   RIGHT MENU
  ////////////////////////////////////////////
  showHideRightMenu(contentType: string) {
    // console.log('Opening/Closing');
    if (this.contentRightMenu === contentType) {
      this.contentRightMenu = contentType;
      this.openRightMenu = !this.openRightMenu;
      if (!this.openRightMenu) {
        this.hideRightMenu();
      }
    } else {
      this.contentRightMenu = contentType;
      this.openRightMenu = true;
    }
    this.openRightMenuChange.emit(this.openRightMenu);
  }

  showRightMenu(contentType: string) {
    this.contentRightMenu = contentType;
    this.openRightMenu = true;
    this.openRightMenuChange.emit(this.openRightMenu);
  }

  hideRightMenu() {
    this.modeEditAdmin = false;
    this.selectedUserAdmin = null;
    this.openRightMenu = false;
    this.openRightMenuChange.emit(this.openRightMenu);
    this.selectedUserAdminChanged.emit(this.selectedUserAdmin);
  }

  ////////////////////////////////////////////
  //   MODAL
  ////////////////////////////////////////////
  showHideModal(contentType: string) {
    // console.log('Opening/Closing');
    if (this.contentModal === contentType) {
      this.contentModal = contentType;
      this.openRightMenu = !this.openModal;
      if (!this.openModal) {
        this.hideModal();
      }
    } else {
      this.contentModal = contentType;
      this.openModal = true;
    }
    this.openModalChange.emit(this.openModal);
  }

  showModal(contentType: string, iframe: boolean) {
    this.contentModal = contentType;
    this.iframeModal = iframe;
    this.openModal = true;
    this.openModalChange.emit(this.openModal);
  }

  hideModal() {
    this.modeEditAdmin = false;
    this.selectedUserAdmin = null;
    this.openModal = false;
    this.iframeModal = false;
    this.openModalChange.emit(this.openModal);
  }

  showModalQualify() {

    this.openModal = true;
    this.openModalQualifyChange.emit(this.openModal);
  }

  hideModalQualify() {
    this.modeEditAdmin = false;
    this.selectedUserAdmin = null;
    this.openModal = false;
    this.textModal = false;
    this.openModalQualifyChange.emit(this.openModal);
  }

  ////////////////////////////////////////////
  //   USER MNGT
  ////////////////////////////////////////////
  setSelectedUserAdmin(employee: UserAuthAosp) {
    this.selectedUserAdmin = employee;
    if (employee) {
      this.modeEditAdmin = true;
    } else {
      this.modeEditAdmin = false;
    }
    this.selectedUserAdminChanged.emit(this.selectedUserAdmin);
  }

  setSelectedRoleAdmin(role: Role) {
    this.selectedRoleAdmin = role;
    this.selectedRoleAdminChanged.emit(this.selectedRoleAdmin);
  }

  saveDoneRole(role: Role) {
    this.selectedRoleAdminSaved.emit(this.selectedRoleAdmin);
  }

  saveDoneUserCreatedOrUpdate(create: boolean) {
    this.userCreatedOrUpdate.emit(create);
  }

  setSelectedTemplate(template: Template) {
    this.selectedTemplate = template;
    this.selectedTemplateChanged.emit(this.selectedRoleAdmin);
  }

  ////////////////////FORM////////
  setSelectedForm(leadDocument: LeadDocument) {
    console.log('');
    this.selectedForm = leadDocument;
    this.selectedFormChanged.emit(this.selectedForm);
  }

  saveDoneForm(leadDocument: LeadDocument) {
    this.selectedFormSaved.emit(this.selectedForm);
  }


  ////////////////////////////////////////////
  //   ROLES & EMPLOYEES
  ////////////////////////////////////////////
  getRoles() {
    return this.http.get<Role[]>(environment.api + 'Roles')
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Roles',
            text: err.message
          });
          return [];
        })
      );
  }

  getAllEmployees(pageSize: number, pageNumber: number) {
    return this.http.get<any>(`${environment.api}Employees/${pageSize}/${pageNumber}`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all employee - pagination',
            text: err.message
          });
          return [];
        })
      );
  }

  getUsers(page: number, pageSize: number) {

    let urlBase = `${environment.api}Users/GetUsers?`;

    if (page != null) {
      urlBase = `${urlBase}Page=${page}&`;
    }

    if (pageSize != null) {
      urlBase = `${urlBase}PageSize=${pageSize}`;
    }
    return this.http.get<any>(urlBase)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting all user - pagination',
            text: err.message
          });
          return [];
        })
      );
  }

  createUser(user: UserAuthAosp) {
    const urlBase = `${environment.api}Users/AddUser`;

    const requestBody = {
      name: user.employeeName,
      contactNumber: user.employeePhone,
      email: user.email,
      roleId: user.rolId,
      storeId: user.storelId,
      employeeIds: [
        0
      ]
    };

    return this.http.post<any>(urlBase, requestBody)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating user',
            text: err.message
          });
          return [];
        })
      );
  }

  EditUser(user: UserAuthAosp) {
    const urlBase = `${environment.api}Users/EditUser`;

    const requestBody = {
      employeeId: user.employeeId,
      name: user.employeeName,
      contactNumber: user.employeePhone,
      email: user.email,
      roleId: user.rolId,
      storeId: user.storelId,
      employeeIds: [
        0
      ]
    }

    return this.http.put<any>(urlBase, requestBody)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating user',
            text: err.message
          });
          return [];
        })
      );
  }

  getEmployeeById(employeeId) {
    return this.http.get<Employee>(environment.api + 'Employees/' + employeeId)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting employee by id',
            text: err.message
          });
          return [];
        })
      );
  }

  getEmployeesFind(searchBy: string[]) {
    const url = `${environment.api}Employees/employeesBySearch`;
    return this.http.post<Employee[]>(url, searchBy)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when looking for Employees',
            text: err.message
          });
          return [];
        })
      );
  }

  getEmployeesByRoleAndStore(roleId: number, storeId?: number) {

    let storeIdQuery = '';
    if (storeId) {
      storeIdQuery = `&StoreId=${storeId}`;
    }

    const url = `${environment.api}Employees/employees-by-role-and-store?RoleId=${roleId}${storeIdQuery}`;
    return this.http.get<Employee[]>(url)
      .pipe(
        catchError(err => {
          console.log('Error', err);
          Swal.fire({
            icon: 'error',
            title: 'Error when looking for Employees by Role and Store',
            text: err.message
          });
          return [];
        })
      );
  }

  updateEmployee(employee) {
    return this.http.put<Employee>(environment.api + 'Employees/' + employee.employeeId, employee)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating employee',
            text: err.message
          });
          return [];
        })
      );
  }

  createEmployee(employee) {
    return this.http.post<Employee>(`${environment.api}Employees`, employee)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating employee',
            text: err.message
          });
          return [];
        })
      );
  }

  createRole(role: Role) {
    return this.http.post<Role>(`${environment.api}Roles`, role)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating role',
            text: err.message
          });
          return [];
        })
      );
  }

  updateRole(role: Role) {
    return this.http.put<Role>(environment.api + 'Roles/' + role.roleId, role)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating role',
            text: err.message
          });
          return [];
        })
      );
  }

  updateRolePermission(rolePermission: RolePermission) {
    return this.http.put<RolePermission>(environment.api + 'RolePermission/' + rolePermission.roleId, rolePermission)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when updating role permission',
            text: err.message
          });
          return [];
        })
      );
  }

  createRolePermission(rolePermission: RolePermission) {
    return this.http.post<RolePermission>(environment.api + 'RolePermission/', rolePermission)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when creating role permission',
            text: err.message
          });
          return [];
        })
      );
  }

}
