import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { Store } from '@ngrx/store';
import { ISettings } from '../../../interfaces/settings';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @HostBinding('class.sidebar') true;
  @HostBinding('class.opened') get opened() { return this.openedSidebar; }
  @HostBinding('class.light') get lightView() { return this.view === 'light'; }
  @HostBinding('class.dark') get darkView() { return this.view === 'dark'; }
  @Input() view: string;
  openedSidebar: boolean;

  constructor(private store: Store<ISettings>) {
    this.view = 'dark';

    this.store.select('menuState').subscribe(state => {
      this.openedSidebar = state;
    });
  }

  ngOnInit() { }
}
