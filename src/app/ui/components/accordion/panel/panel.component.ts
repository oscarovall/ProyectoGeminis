import { Component, OnInit, Input, Output, HostBinding, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { shrink } from '../../../../animations/shrink';

@Component({
  selector: 'tc-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  animations: [shrink]
})

export class TCPanelComponent implements OnInit {
  @HostBinding('class.tc-panel') true;
  @HostBinding('class.align-left') get getAlignLeft() { return this.align === 'Left'; }
  @HostBinding('class.align-center') get getAlignCenter() { return this.align === 'Center'; }
  @HostBinding('class.align-right') get getAlignRight() { return this.align === 'Right'; }
  @HostBinding('class.panel-small') get getPanelSmall() { return this.size === 'sm'; }
  @HostBinding('class.panel-large') get getPanelLarge() { return this.size === 'lg'; }
  @HostBinding('class.icon') @Input() icon: boolean;

  @Input() alternative: boolean;
  @Input() title: string;
  @Input() opened: boolean = false;
  @Input() contentBg: string;
  @Input() align: string;
  @Input() size: string;
  @Input() titleIcon: string;

  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  state: string;
  public view: boolean = true;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.contentBg = '#ffffff';
    this.align = 'left';
    this.size = 'default';
    this.state = 'inactive';
  }

  ngOnInit() {
    if (this.opened) {
      this.state = 'active';
      this.view = true;
    } else {
      // this.view = false;
    }
  }

  public changeState() {
    this.state === 'inactive' ? this.state = 'active' : this.state = 'inactive';
    this.opened = !this.opened;
  }

  getPanelClasses() {
    return {
      'active': this.state === 'active',
      '': this.state !== 'active',
      'alternative': this.view
    };
  }

  public changeStyle() {
    this.alternative = true;
    this.view = this.alternative;
    this.changeDetector.detectChanges();
  }


}
