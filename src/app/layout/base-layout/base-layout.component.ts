import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { ISettings } from '../../interfaces/settings';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { INotification } from '../../interfaces/notification';
import { IAppState } from '../../interfaces/state';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as MenuActions from '../../store/actions/menu.actions';
import { INotificationState } from '../../interfaces/notification.state';
import { Router } from '@angular/router';
import { getAllNotifications } from '../../store/reducers/notification.reducer';
import { IMenuItem } from '../../interfaces/main-menu';
import { DataService } from '../../services/service.index';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  scrollbarOptions: any;
  verticalNavStyle: string;
  topbarStyle: string;
  openedSidebar: boolean;
  notifications: Observable<INotification[]>;
  displaySearch: boolean;
  boxed: boolean;
  searchState: string;
  pageTitle: string;
  closeDropdown: EventEmitter<boolean>;
  searchGroup: FormGroup;
  routers: Array<any>;
  windowSize: number;
  menuUrl: string;
  menuItems: IMenuItem[];
  horizontalNavColor: string;

  @HostListener('window:resize')
  public onResize(event?) {
    this.store.dispatch(new MenuActions.Close());

    this.windowSize = window.innerHeight;

    if (window.innerWidth < 768) {
      this.searchState = 'hide';
    }
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<INotificationState>,
    private settingsStore: Store<ISettings>,
    private menuStore: Store<IAppState>,
    private dataSv: DataService,
  ) {
    this.closeDropdown = new EventEmitter<boolean>();
    this.scrollbarOptions = {
      autoDraggerLength: true,
      axis: 'y',
      theme: 'minimal'
    };
    this.searchState = 'hide';
    this.windowSize = 0;
    this.menuItems = [];
    this.routers = [];
    this.notifications = this.store.select(getAllNotifications);

    this.router.events.subscribe(() => {
      this.setPageTitle(this.router.url);
    });
    this.menuUrl = '../../../assets/data/menu.json';
  }

  ngOnInit() {
    this.settingsStore.select('settings').subscribe((state: ISettings) => {
      this.topbarStyle = state.topbarStyle;
      this.verticalNavStyle = state.verticalNavColor;
      this.boxed = state.boxed;
      this.displaySearch = state.showSearch;
      this.searchState = this.displaySearch ? this.searchState : 'hide';
      this.horizontalNavColor = state.horizontalNavColor;
    });
    this.menuStore.select('menuState').subscribe(state => {
      this.openedSidebar = state;
    });

    this.onResize();
    this.initSearchForm();
    this.getMenuItems(this.menuUrl);
  }

  getMenuItems(menuUrl: string) {
    let myObserver = {
      next: x => this.menuItems = x,
      error: err => this.dataSv.handleError(err),
      complete: () => this.getItemsRouters()
    };

    this.dataSv.getData(menuUrl).subscribe(myObserver);
  }

  initSearchForm() {
    this.searchGroup = this.fb.group({
      search: ''
    });
  }

  toggleMenu(event: Event, state: boolean) {
    event.preventDefault();

    this.store.dispatch(state ? new MenuActions.Close() : new MenuActions.Open());
  }

  toggleSearch() {
    this.searchState === 'hide' ? this.searchState = 'show' : this.searchState = 'hide';
  }

  setPageTitle(router: string) {
    this.pageTitle = router.split('/')[router.split('/').length - 1].replace('-', ' ');
    this.pageTitle = this.pageTitle.charAt(0).toUpperCase() + this.pageTitle.slice(1);
  }

  getInputColor(style: string) {
    return style === 'dark' ? '#fff' : '#000';
  }

  getItemsRouters() {
    this.routers = [];

    this.menuItems.forEach((item: IMenuItem) => {
      if (item.sub) {
        item.sub.forEach((subItem) => {
          this.routers.push(subItem);
        });
      } else {
        this.routers.push(item)
      }
    })
  }

  buildUrl(layout: string, routing: string): string {
    return '/' + layout + '/' + routing;
  }

  findRouter(name: string) {
    let arr = this.routers.filter((element) => {
      return element.title == name;
    });
    if (arr.length > 0) {
      return arr[0].routing;
    }
    else {
      return name;
    }
  }

  goTo(layout: string) {
    let name = this.searchGroup.get('search').value;
    if (name == '') return;

    let routing = this.findRouter(name);
    let url = routing;

    let extraLayout = ['/extra/404', '/extra/500', '/extra/log-in', '/extra/sign-up'];

    if (!extraLayout.includes(routing)) {
      url = this.buildUrl(layout, routing);
    } else {
      url = routing;
    }

    setTimeout(() => {
      this.router.navigate([url]);
    }, 0);
  }

  goToLogin(event: Event, url: string) {
    event.preventDefault();

    setTimeout(() => {
      this.router.navigate([url]);
    }, 0);
  }

  onCloseDropdown() {
    this.closeDropdown.emit(true);
  }

  closeSidebar() {
    this.store.dispatch(new MenuActions.Close());
  }

  callProfile(){
  console.log("ok")
  }
}
