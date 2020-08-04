import { Component, HostBinding, Input, ContentChildren, QueryList, AfterContentInit, OnInit } from '@angular/core';
import { TCPanelComponent } from './panel';

@Component({
  selector: 'tc-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class TCAccordionComponent implements AfterContentInit, OnInit {
  @ContentChildren(TCPanelComponent) panels: QueryList<TCPanelComponent>;

  @HostBinding('class.tc-accordion') true;
  @HostBinding('class.default') get viewDefault() { return this.view === 'default' };
  @HostBinding('class.alternative') get viewAlternative() { return this.view === 'alternative' };

  @Input() view: string;

  constructor() {
  }

  ngAfterContentInit() {
    this.panels.forEach((panel: TCPanelComponent) => {
      panel.toggle.subscribe(() => {
        this.openPanel(panel);
      });
      if (this.view === 'alternative') {
        panel.changeStyle();
      }
    });
  }

  ngOnInit() { }

  openPanel(panel: TCPanelComponent) {
    if (panel.opened) {
      panel.opened = false;
    } else {
      panel.opened = true;
    }
  }

  changeStyle(panel: TCPanelComponent) {
    panel.alternative = true;
  }
}
