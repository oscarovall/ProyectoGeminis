import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class TCIconComponent implements OnInit {
  @HostBinding('class.tc-icon') true;
  @HostBinding('style.padding') get iconPadding() {
    const PADDING = this.padding;

    return (typeof PADDING === 'number') ? PADDING + 'px' : PADDING;
  };
  @Input() iconClass: string;
  @Input() padding: string | number;

  ngOnInit() { }
}
