import { Component, OnInit, HostBinding, Input, OnChanges } from '@angular/core';

import { ITask } from '../../interfaces/task';
import { ITaskCategory } from '../../interfaces/taskCategory';

import { DragulaService} from 'ng2-dragula';

@Component({
  selector: 'tc-taskboard',
  templateUrl: './taskboard.component.html',
	styleUrls: ['./taskboard.component.scss'],
	viewProviders: [DragulaService]
})
export class TCTaskboardComponent implements OnInit, OnChanges {
	@HostBinding('class.tc-taskboard') true;

	@Input() data: Array<ITask>;
	newList: boolean;
	categories: Array<ITaskCategory>;
	taskList: Array<ITask>;

  constructor(private dragulaService: DragulaService) { 
		this.newList = false;

		dragulaService.createGroup('bag-lists', {  });

		this.categories = [
			{
				active: false,
				title: 'To Do',
				tasks: []
			},
			{
				active: false,
				title: 'In Progress',
				tasks: []
			},
			{
				active: false,
				title: 'Testing',
				tasks: []
			},
			{
				active: false,
				title: 'Done',
				tasks: []
			},
		];
		this.taskList = [];
	}

	addTask(task: ITask) {
		this.categories.forEach((category: ITaskCategory) => {
			 category.title.toLowerCase() != task.category || category.tasks.push(task)
		});
	}

	getNewListState(): boolean {
		return this.newList;
	}

	toggleListState() {
		this.newList = !this.newList;
	}

	addNewList(textbox,title: string) {
		if (title.length > 0)  {
			this.categories.push({
				active:false,
				tasks: [],
				title: title
			});
			this.newList = false; 
		}
		textbox.value = '';
	}

	addNewTask(category: ITaskCategory, title: string, desc: string) {
		if (title.length > 0) {
			category.tasks.push({
				title: title,
				desc: desc,
				category: category.title.toLowerCase()
			});
			this.categories.forEach((category: ITaskCategory) => { category.active = false });
		}
	}

	openPanel(category: ITaskCategory) {
		this.categories.forEach((category: ITaskCategory) => { category.active = false });
		category.active = true;
	}	

	fillCategory() {
		this.taskList.forEach((task: ITask) => {
			this.addTask(task);
		})
	}

  ngOnInit() {
		this.taskList = this.data;
		this.fillCategory();
	}

	ngOnChanges()  {
		this.ngOnInit();
	}	
}
