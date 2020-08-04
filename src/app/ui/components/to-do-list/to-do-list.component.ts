import { Component, OnInit,Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ITodoItem } from '../../interfaces/todoItem';


@Component({
  selector: 'tc-todo',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class TCToDoListComponent implements OnInit, OnChanges {
	@Output() addNewItem: EventEmitter<string>;

	@Input() data: Array<ITodoItem>;
	
	items: Array<ITodoItem>;

  constructor() { 
		this.addNewItem = new EventEmitter<string>();
		this.items = [];
	}

	addItem(event ,item: string, textBox) {
		if (item && item != '' && event.keyCode == 13) {
			this.addNewItem.emit(item);
			this.items.push({
				text: item,
				done: false
			});
			textBox.value = '';
		}
	}

	removeItem(item: ITodoItem) {
		this.items.splice(this.items.indexOf(item), 1);
	}
	
  ngOnInit() {
		this.items = this.data;
	}
	
	ngOnChanges() {
		this.ngOnInit();
	}
}
