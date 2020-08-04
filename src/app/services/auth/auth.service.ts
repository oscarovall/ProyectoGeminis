import { Injectable, AfterViewInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { Role } from '../../models/Role';
import { RolePermission } from '../../models/RolePermission';
import { Employee } from '../../models/Employee';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { RolesForAuth } from '../../shared/models/role';
import { RolePagesForAuth } from '../../shared/models/role-page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  currentUser: Employee;
  rolePermissions: RolePermission[];

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {
    // this.userdata();
  }

  // userdata() {
  //   this.getEmployeeById(3).subscribe((employee: Employee) => {

  //     this.currentUser = employee;
  //     this.setUser(employee);

  //     this.getRolePermissionsById(this.currentUser.roleId).subscribe((rp: RolePermission[]) => {
  //       this.rolePermissions = rp;
  //     });
  //   });
  // }

  // signIn(usernameV: string, passwordV: string) {
  //   return Auth.signIn({
  //     username: usernameV, // Required, the username
  //     password: passwordV // Optional, the password
  //   })
  //     .then((user) => {
  //       this.currentUser = user;
  //       console.log(this.currentUser);
  //       localStorage.setItem('user', JSON.stringify(user));
  //       return user;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // }
  signIn(username: string, password: string): Observable<any> {


    const body = {
      username: username,
      password: password
    };

    const url = `${environment.api}Users/authenticate`;
    const initSignInn = new InitSignIn();

    return this.http.post<AuthenticateResultDto>(url, body)
      .pipe(concatMap(result => {
        // debugger
        // this.token = result.token;
        // const tokenInfo = this.getTokenInfo();
        // localStorage.setItem('user', JSON.stringify(tokenInfo));
        initSignInn.token = result.token;
        initSignInn.tokenInfo = this.getTokenInfo(result.token);
        return this.getEmployeeById(initSignInn.tokenInfo.employeeId);
      }))
      .pipe(concatMap(result => {
        // debugger
        initSignInn.currentUser = result;

        // this.setUser(this.currentUser);
        return this.getRolePermissionsById(initSignInn.currentUser.roleId);
      }))
      .pipe(concatMap(result => {
        // debugger

        initSignInn.rolePermissions = result;

        this.token = initSignInn.token;
        this.currentUser = initSignInn.currentUser;
        this.rolePermissions = initSignInn.rolePermissions;
        localStorage.setItem('token', initSignInn.token);
        localStorage.setItem('user', JSON.stringify(initSignInn.token));
        localStorage.setItem('employee', JSON.stringify(initSignInn.currentUser));
        localStorage.setItem('rolePermissions', JSON.stringify(initSignInn.rolePermissions));
        return of(result);
      }));
  }

  private getTokenInfoFromToken(): any {
    return jwt_decode(localStorage.getItem('token'));
  }

  private getTokenInfo(token: string): any {
    return jwt_decode(token);
  }

  isLogged() {
    // return Auth.currentSession();
    const user = this.getUser();
    if (user) {
      return true;
    } else {
      return false;
    }
  }


  signOut(): void {
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    localStorage.setItem('employee', null);
    localStorage.setItem('rolePermissions', null);
  }

  setUser(employee: any) {
    localStorage.setItem('employee', JSON.stringify(employee));
  }

  getUser(): Employee {
    if (localStorage.getItem('employee') != null) {
      return JSON.parse(localStorage.getItem('employee'));
    }
    return null;
    // else {
    //   const user = new Employee();
    //   user.employeeId = 3;
    //   this.setUser(user);
    //   return user;
    // }
  }

  signUp(employee: Employee) {
    console.log(Employee);
    return Auth.signUp({
      username: employee.email,
      password: employee.password,
      attributes: {
        email: employee.email, // optional
        phone_number: employee.cellphone // optional - E.164 number convention
      },
      validationData: [] //optional
    })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('AWS Error', err);

        Swal.fire({
          icon: 'error',
          title: 'Error when creating the user',
          text: err.message
        });
        return err;
      });
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

  getRoleById(roleId) {
    return this.http.get<Role>(environment.api + 'Roles/' + roleId)
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

  getRolePermissionsById(roleId) {
    return this.http.get<RolePermission[]>(environment.api + 'RolePermission/' + roleId)
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

  hasRole(role: RolesForAuth): boolean {

    try {
      //debugger
      const roleId = this.getRoleFromToken();
      if (roleId === role) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }


  private getRoleFromToken(): number {
    const tokenInfo = this.getTokenInfoFromToken();
    if (tokenInfo.role_permision
      && tokenInfo.role_permision.length > 0) {
      const roleAsString = tokenInfo.role_permision[0].split('-')[0];
      const roleAsNumber = Number(roleAsString);
      return !isNaN(roleAsNumber) ? roleAsNumber : 0;
    }

    return null;
  }


  hasRolePage(rolePage: RolePagesForAuth): boolean {

    try {
      // debugger
      const rolePageId = this.getRolePageFromToken(rolePage);
      if (rolePageId == rolePage) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  private getRolePageFromToken(rolePage: RolePagesForAuth): number {
    const tokenInfo = this.getTokenInfoFromToken();
    if (tokenInfo.role_permision
      && tokenInfo.role_permision.length > 0) {
      for (const rp of tokenInfo.role_permision) {
        const rolePageAsString = tokenInfo.role_permision[0].split('-')[1];
        const rolePageAsNumber = Number(rolePageAsString);
        if (!isNaN(rolePageAsNumber)) {
          return rolePageAsNumber;
        }
      }
    }

    return null;
  }


  //  private getRoleFromToken(): number {
  //   const tokenInfo = this.getTokenInfoFromToken();
  //   if (tokenInfo.role_permision
  //     && tokenInfo.role_permision.length > 0) {
  //     const roleAsString = tokenInfo.role_permision[0].split('-')[0];
  //     const roleAsNumber = Number(roleAsString);
  //     return !isNaN(roleAsNumber) ? roleAsNumber : 0;
  //   }

  //   return null;
  // }


  hasRoleWithRolePage(role: RolePagesForAuth, rolePage: RolePagesForAuth): boolean {

    try {
      const tokenInfo = this.getTokenInfoFromToken();
      if (tokenInfo.role_permision
        && tokenInfo.role_permision.length > 0) {

        for (const rp of tokenInfo.role_permision) {
          const roleAsString = tokenInfo.role_permision[0].split('-')[0];
          const roleAsNumber = Number(roleAsString);

          const rolePageAsString = tokenInfo.role_permision[0].split('-')[1];
          const rolePageAsNumber = Number(rolePageAsString);
          if (roleAsNumber == role
            && rolePageAsNumber == rolePage) {
            return true;
          }
        }
      }

    } catch (error) {
      console.error(error);
    }

    return false;
  }

  // private getFromToken(role: RolePagesForAuth, rolePage: RolePagesForAuth): number {
  //   const tokenInfo = this.getTokenInfoFromToken();
  //   if (tokenInfo.role_permision
  //     && tokenInfo.role_permision.length > 0) {
  //     for (const rp of tokenInfo.role_permision) {
  //       const rolePageAsString = tokenInfo.role_permision[0].split('-')[1];
  //       const rolePageAsNumber = Number(rolePageAsString);
  //       if (!isNaN(rolePageAsNumber)) {
  //         return rolePageAsNumber;
  //       }
  //     }
  //   }

  //   return null;
  // }

  // hasPermisison(pageName) {
  //   // debugger
  //   const persmisos = JSON.parse(localStorage.getItem('rolePermissions'));
  //   const permissionFound = persmisos.find(rp => rp.rolePage.rolePage1 === pageName);
  //   if (permissionFound && permissionFound.permission !== 'none') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}

export interface AuthenticateResultDto {
  token: string;
}

export class InitSignIn {
  token: string;
  tokenInfo: any;
  currentUser: Employee;
  rolePermissions: RolePermission[];
}
