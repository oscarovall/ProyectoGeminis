import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService} from '../../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, AfterContentInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.authService.signOut();
    setTimeout(() => {
      this.router.navigate(['/auth/log-in']);
    }, 0);
  }

}
