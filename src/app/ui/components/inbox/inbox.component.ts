import { Component, OnInit, OnChanges, HostBinding, HostListener, Input } from '@angular/core';

import { IInboxMenuItem } from '../../interfaces/inboxMenuItem';
import { IMessage } from '../../interfaces/message';

import { menuShrink } from '../../../animations/menuShrink';
import { itemSelected } from '../../../animations/itemSelected';
import { backgroundAppearence } from '../../../animations/backgroundAppearance'


@Component({
  selector: 'tc-inbox',
  templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	animations: [menuShrink, itemSelected, backgroundAppearence]
})
export class TCInboxComponent implements OnInit, OnChanges {
	@HostBinding('class.tc-inbox') true;

	@HostListener('window:resize', ['$event'])
		onResize(event) {
  		if (document.documentElement.clientWidth > 767)  {
				this.sideBarState = 'shown';
			} else {
				this.sideBarState = 'hiden';
			}
	}

	@Input() data: Array<IMessage>;

	messages: Array<IMessage>;
	displayedData: Array<IMessage>;

	menuItems: Array<IInboxMenuItem>;
	labels: Array<string>;
	shownMessage: IMessage;
	sideBarState: string;
	messageState: boolean;
	sortDirection: string;
	newMessage: boolean;

  constructor() {
		this.labels = ['New', 'Promo','Adds'];
		
		this.sortDirection = '';
		this.newMessage = false;

		this.sideBarState = document.documentElement.clientWidth > 767 ? 'shown': 'hiden';
		this.messageState = false;
		this.messages = [];
		this.shownMessage = {
			subject: '',
			sender: '',
			text: '',
			type: '',
			img: '',
			time: ''
		};

		this.menuItems = [
			{
				active: false,
				icon: 'icofont-inbox',
				title: 'Inbox',
				tag: 'inbox'
			},
			{
				active: false,
				icon: 'icofont-paper-plane',
				title: 'Sent',
				tag: 'sent'
			},
			{
				active: false,
				icon: 'icofont-archive',
				title: 'Drat',
				tag: 'draft'
			},
			{
				active: false,
				icon: 'icofont-trash',
				title: 'Trash',
				tag: 'trash'
			}
		];
	}

	filterMessages(event, filterString: string) {
		if (event.keyCode == 13) {
			let filterMessages: Array<IMessage>;
			this.menuItems.forEach((x: IInboxMenuItem) => {!x.active || this.changeItem(x) });
			if (filterString.length > 0) {
				 filterMessages = this.displayedData.filter((message : IMessage) => {
				return message.sender.toLocaleLowerCase().match(filterString.toLocaleLowerCase())
			});
				this.displayedData = filterMessages;
			} else {
				this.menuItems.forEach((x: IInboxMenuItem) => {!x.active || this.changeItem(x) });
			} 	
		}
	}

	sortMessages() {
		this.sortDirection = this.sortDirection == 'asc' ? this.sortDirection = 'desc': this.sortDirection = 'asc';
		let sortedMessages = this.displayedData;
		sortedMessages.sort((previous: IMessage, current: IMessage) => {
      if (previous.sender > current.sender) {
				return this.sortDirection === 'desc' ? -1: 1;
      } else if (previous.sender < current.sender) {
        return this.sortDirection === 'asc' ? -1: 1;
			}
      return 0;
		});
		this.displayedData = sortedMessages;
	}

	public changeItem(item: IInboxMenuItem) {
		this.menuItems.forEach(menuItem => {
			menuItem.active = false;
		});
		item.active = true;
		this.messageState = false;
		this.displayedData = [];
		this.messages.forEach((x: IMessage) => {
			x.type != item.tag || this.displayedData.push(x);
		});
	}

	getCount(item : IInboxMenuItem): string {
		let count: number = 0;
		this.messages.forEach((x: IMessage) => {
			x.type != item.tag !|| count++;
		});
		return count.toString();
	}

	toggleState() {
		this.sideBarState = this.sideBarState == 'shown' ? this.sideBarState = 'hiden': this.sideBarState = 'shown';
	}

	getMessageState():string {
		return String(this.messageState);
	}

	getMainState():string {
		return String(!this.messageState);
	}

	getNewMessageState() {
		return String(this.newMessage);
	}

	toggleNewMessage() {
		this.newMessage = !this.newMessage;
	}

	selectMessage(message: IMessage) {
		this.shownMessage = message;
		this.messageState = true;
	}

	closeMessage() {
		this.messageState = false;
	}

  ngOnInit() {
		this.messages = this.data;
		this.changeItem(this.menuItems[0]);
	}
	
	ngOnChanges() {
		this.messages = this.data;
		this.changeItem(this.menuItems[0]);
	}
}
