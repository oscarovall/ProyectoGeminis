import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/service.index';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // debugger
    if (this.authService.isLogged()) {

      // debugger
      const roles = next.data.roles;
      if (Array.isArray(roles) && roles.length > 0) {
        // debugger
        for (const role of roles) {
          const hasRoleValue = this.authService.hasRole(role);
          if (hasRoleValue) {
            return true;
          }
        }
        this.router.navigate(['/not-enough-rights']);
        return false;
      }

      // debugger
      const rolePages = next.data.rolePages;
      if (Array.isArray(rolePages) && rolePages.length > 0) {
        for (const rp of rolePages) {
          const hasRolePageValue = this.authService.hasRolePage(rp);
          // debugger
          if (hasRolePageValue) {
            return true;
          }
        }
        this.router.navigate(['/not-enough-rights']);
        return false;
      }

      // debugger
      const roleWithRolePage = next.data.roleWithRolePage;
      if (Array.isArray(roleWithRolePage) && roleWithRolePage.length > 0) {
        for (const rrp of roleWithRolePage) {
          const hasRoleWithRolePage = this.authService.hasRoleWithRolePage(rrp.role, rrp.rolePage);
          // debugger
          if (hasRoleWithRolePage) {
            return true;
          }
        }
        this.router.navigate(['/not-enough-rights']);
        return false;
      }


      return true;
      // const pageName = next.data.pageName;
      // if (this.authService.hasPermisison(pageName)) {
      //   return true;
      // } else {
      //   this.sendNotification('You do not have permission to access that route');
      //   this.router.navigate(['/']);
      //  npm return false;
      // }
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }
}
