import { Component, OnInit, HostBinding, Input, Output, OnChanges, HostListener } from '@angular/core';
import { IMenuItem } from '../../interfaces/menuItem';
import { IUser } from '../../interfaces/user';
import { ILabel } from '../../interfaces/label';

import { itemSelected} from '../../../animations/itemSelected';
import { menuShrink } from '../../../animations/menuShrink';
  
@Component({
  selector: 'tc-users',
  templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	animations: [itemSelected, menuShrink]
})
export class TCUsersComponent implements OnInit {
	@HostBinding('class.tc-users') true;

	@HostListener('window:resize', ['$event'])
		onResize(event) {
  		if (document.documentElement.clientWidth > 766)  {
				this.sideBarState = 'shown';
			} else {
				this.sideBarState = 'hiden';
			}
	}

	@Input() data: Array<IUser>;

	letters: Array<string>;
	list: Array<IMenuItem>;
	users: Array<IUser>;
	displayedUsers: Array<IUser>;
	labels: Array<ILabel>;

	userState: boolean;
	sideBarState: string;
	sortDirection: string;

	selectedUser: IUser;
	selectedLetter: string;
	selectedLabel: ILabel;

  constructor() { 
		this.sideBarState = document.documentElement.clientWidth > 576 ? 'shown': 'hiden';
		this.selectedLetter = '';
		this.sortDirection = '';
		this.selectedLabel = {
			title: '',
			active: false
		}
		this.selectedUser = {
			img: '',
			tag: '',
			role: '',
			name: '',
			labels: [],
			email: '',
			phone: '',
			location: '',
			birthDate: '',
		};

		this.userState = false;
		this.displayedUsers = [];
		this.users = [];
		this.data = [];
		this.labels = [
			{
				title: 'Clients',
				active: false
			},
			{
				title: 'Suppliers',
				active: false
			},
			{
				title: 'Competitors',
				active: false
			}
		];

		this.list = [
			{
				title: 'All',
				active: false,
				tag: 'all',
				counter: 0
			},
			{
				title: 'Company',
				active: false,
				tag: 'company',
				counter: 0
			},
			{
				title: 'Personal',
				active: false,
				tag: 'personal',
				counter: 0
			},
			{
				title: 'Team',
				active: false,
				tag: 'team',
				counter: 0
			}
		];
		this.letters = [
			'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
		];
	}

	addLabel(event,label: string, input) {
		if(event.keyCode == 13 && label.length > 0) {
			this.labels.push({title: label, active: false});
			input.value = '';
		}
	}

	changeItem(item: IMenuItem) {
		this.list.forEach((item: IMenuItem) => {
			item.active = false;
		});
		if (item.tag == 'all'){
			this.displayedUsers = this.users;
		} else {
			this.displayedUsers = this.users.filter((user: IUser) => {
				return user.tag.match(item.tag)
			});
		}
		this.labels.forEach((label: ILabel) => {
			label.active = false;
		});
		item.active = true;
		this.userState = false;
		this.selectedLetter = '';
	}

	filterUsers(event,filterString: string) {
		if (event.keyCode == 13) {
			this.refreshList();
			this.displayedUsers = this.displayedUsers.filter((user: IUser)=> {
				return user.name.toLowerCase().match(filterString.toLowerCase())
			});
		}
	}

	filterClick(letter: string) {
		if (this.selectedLetter == letter) {
			this.selectedLetter = '';
			this.refreshList();
		} else {
			this.selectedLetter = letter;
			this.refreshList();
			this.displayedUsers = this.displayedUsers.filter((user: IUser) => {
				return user.name.slice(0,1).toLowerCase().match(letter.toLowerCase());
			})
			this.selectedLetter = letter;
		}
	}

	getUsersCount(item: IMenuItem): string {
		if (item.tag != 'all') {
			return this.users.filter((user: IUser) => { 
				return user.tag.match(item.tag)
			}).length.toString();
		}
		else {
			return this.users.length.toString();
		}
	}

	refreshList() {
		this.list.forEach((item: IMenuItem) => {!item.active || this.changeItem(item)});
	}

	labelClick(label: ILabel) {
		this.refreshList();
		this.labels.forEach((label: ILabel) => {label.active = false})
		if (label != this.selectedLabel) {
			label.active = true;
			this.selectedLabel = label;
			this.displayedUsers = this.displayedUsers.filter((user: IUser) => { 
			return user.labels.includes(label.title);
		});
		} else {
			this.selectedLabel = {
				title: '',
				active: false
			};
		}
	} 

	sortUsers() {
		this.sortDirection = this.sortDirection == 'asc' ? this.sortDirection = 'desc': this.sortDirection = 'asc';
		let sortedMessages = this.displayedUsers;
		sortedMessages.sort((previous: IUser, current: IUser) => {
      if (previous.name > current.name) {
				return this.sortDirection === 'desc' ? -1: 1;
      } else if (previous.name < current.name) {
        return this.sortDirection === 'asc' ? -1: 1;
			}
      return 0;
		});
		this.displayedUsers = sortedMessages;
	}

	getSideBarState():boolean {
		return this.sideBarState == 'hiden' ? true : false ;
	}

	toggleState() {
		this.sideBarState = this.sideBarState == 'shown' ? this.sideBarState = 'hiden': this.sideBarState = 'shown';
	}

	selectUser(user: IUser) {
		this.selectedUser = user;
		this.userState = true;
	}

	getItemState(): string {
		return this.userState.toString();
	}

  ngOnInit() {
		this.users = this.data;
		this.changeItem(this.list[0]);
	}
	
	ngOnChanges() {
		this.ngOnInit();
	}
}
