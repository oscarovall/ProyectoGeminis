import { Directive, OnInit, Input, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[tcBgColor]'
})
export class TCBgColorDirective implements OnInit {
  @HostBinding('class.custom-bg-color') true;
  @Input() tcBgColor: string | string[];
  currentBg: string;
  defaultBg: string;
  hoveredBg: string;

  ngOnInit() {
			const BG_COLOR = this.tcBgColor;

    this.defaultBg = (typeof BG_COLOR === 'string') ? BG_COLOR: BG_COLOR[0];
    this.hoveredBg = (typeof BG_COLOR === 'string') ? BG_COLOR: BG_COLOR[1];
    this.currentBg = this.defaultBg;
  }

  @HostBinding('style.background') get getStyle() {
    return this.currentBg;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.currentBg = this.hoveredBg;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.currentBg = this.defaultBg;
  }
}
