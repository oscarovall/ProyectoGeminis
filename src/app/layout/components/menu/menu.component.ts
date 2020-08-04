import { Component, OnInit, HostBinding, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/state';


import { IMenuItem } from '../../../interfaces/main-menu';
import { subAppear } from '../../../animations/subApear';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DataService } from '../../../services/service.index';

declare function init_plugins();

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [subAppear]
})
export class MenuComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

  @HostBinding('class.main-menu') true;
  @HostBinding('class.horizontal') @Input() horizontal: boolean;

  @Input() dataUrl: string;

  menuItems: IMenuItem[];
  menuState: boolean;
  maxListSize: number;

  @HostListener('window:resize')
  public onResize() {
    // this.menuItems.forEach((item: IMenuItem) => {
    //   item.active = false;
    // });
  }

  constructor(
    private dataSv: DataService,
    private router: Router,
    private el: ElementRef,
    private store: Store<IAppState>
  ) {
    this.store.select('menuState').subscribe(state => {
      this.menuState = state;
    });
    this.maxListSize = 10;
    this.horizontal = false;
  }

  ngOnInit() {
    this.getData(this.dataUrl);
  }

  getData(url: string) {
    const OBSERVER = {
      next: x => {
        this.menuItems = x;
        init_plugins();
      },
      error: (err) => this.dataSv.handleError(err),
    };

    this.dataSv.getData(url).subscribe(OBSERVER);
  }

  // toggle(event: Event, item: IMenuItem) {
  //   event.preventDefault();

  //   item.active = !item.active;
  // }

  // subState(active: boolean) {
  //   return active ? 'active' : 'inactive';
  // }
}
