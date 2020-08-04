import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @HostBinding('class.nav-bar') true;
  @HostBinding('class.light') get lightStyle() { return this.view === 'light'; }
  @HostBinding('class.dark') get darkStyle() { return this.view === 'dark'; }
  @HostBinding('class.boxed') get getFullWidth() { return this.boxed; }

  @Input() boxed: boolean;
  @Input() view: string;

  constructor() {
    this.view = 'light';
  }

  ngOnInit() { }
}
