import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { TCTableComponent } from '..'

@Component({
  selector: 'tc-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class TCColumnComponent implements OnInit {
	@ContentChild('tableBodyTemplate', { static: true }) bodyTemplate: TemplateRef<any>;
	@ContentChild('headerBodyTemplate', { static: true }) headerTemplate: TemplateRef<any>;

	@Input() columnTitle: string;
	@Input() columnName: string;
	@Input() enableFiltering: boolean;
	@Input() enableSorting: boolean;

	config: any;
		
  constructor(private table: TCTableComponent) {
		this.enableFiltering = false;
		this.enableSorting = false;
		this.columnName = '';
		this.columnTitle = '';

		this.config = {
			title: '',
			name: '',
			sort: '',
			enableSorting: this.enableSorting,
			filter: this.enableFiltering,
			filtering: {
				filterString: '',
				columnName: name
			}
		};
	}

	public setConfig() {
		this.config.name = this.columnName;
		this.config.title = this.columnTitle;
		this.config.filtering.columnName = this.columnName;
		this.config.enableSorting = this.enableSorting;
		if (this.columnName === '') {
			this.config.filtering = false;
		}
	}

  ngOnInit() {
		this.setConfig();
		this.table.addColumn(this);
  }
}
