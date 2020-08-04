import { Directive, OnInit, Input, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[tcColor]'
})
export class TCColorDirective implements OnInit {
  @HostBinding('class.custom-color') true;
  @Input() tcColor: string | string[];
  currentColor: string;
  defaultColor: string;
  hoveredColor: string;

  ngOnInit() {
    const COLOR = this.tcColor;

    this.defaultColor = (typeof COLOR === 'string') ? COLOR: COLOR[0];
    this.hoveredColor = (typeof COLOR === 'string') ? COLOR: COLOR[1];
    this.currentColor = this.defaultColor;
  }

  @HostBinding('style.color') get getStyle() {
    return this.currentColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.currentColor = this.hoveredColor;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.currentColor = this.defaultColor;
  }
}
