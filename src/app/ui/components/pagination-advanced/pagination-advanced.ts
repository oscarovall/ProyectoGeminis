import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "ngbd-pagination-advanced",
  templateUrl: "./pagination-advanced.html",
})
export class NgbdPaginationAdvanced {
  @Input() totalItems;
  @Input() page: number;
  @Output() pageChanged = new EventEmitter<number>();
  pageChange(page: number) {
    this.pageChanged.emit(page);
  }
}
