import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/service.index';
import { delay, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string;
  password: string;
  disableInputs = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {

    if (authService.isLogged()) {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 0);
    }
  }

  ngOnInit() {
  }

  singin() {
    this.password = (<HTMLInputElement>document.getElementById('password')).value;
    this.user = (<HTMLInputElement>document.getElementById('user')).value;


    if (this.password != null
      && this.password !== ''
      && this.password != null
      && this.password !== '') {
      this.disableInputs = true;
      this.authService.signIn(this.user, this.password)
        // .pipe(delay(10000))
        .pipe(finalize(() => {
          this.disableInputs = false;
        }))
        .subscribe(
          result => {
            console.log(result);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 0);
          },
          error => {
            console.error(error);
            this.initInputs();
            this.sendNotification('Error');
          }
        );
    }
  }

  initInputs(): void {
    (<HTMLInputElement>document.getElementById('password')).value = '';
    (<HTMLInputElement>document.getElementById('user')).value = '';
    (<HTMLInputElement>document.getElementById('logIn')).value = '';
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

}
