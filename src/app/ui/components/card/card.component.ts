import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'tc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class TCCardComponent implements OnInit {
  @HostBinding('class.tc-card') true;
  @HostBinding('class.outline') @Input() outline: boolean;
  @HostBinding('style.overflow') get getCardOverflow() { return !this.overflow ? 'visible' : 'auto'; }
  @HostBinding('class.card-info') get viewInfo() { return this.view === 'info'; }
  @HostBinding('class.card-success') get viewSuccess() { return this.view === 'success'; }
  @HostBinding('class.card-warning') get viewWarning() { return this.view === 'warning'; }
  @HostBinding('class.card-error') get viewError() { return this.view === 'error'; }
  @HostBinding('class.text-right') get rightAlign() { return this.align === 'right'; }
  @HostBinding('class.text-center') get centerAlign() { return this.align === 'center'; }
  @HostBinding('style.overflow') get getOverflowState() { return this.overflow ? 'visible' : 'auto'; }
  @HostBinding('style.backgroundImage') get getBgImage() {
    return this.gradient ? this.gradient : (this.bgImg ? `url(${this.bgImg})` : null);
  }
  @HostBinding('class.full-width') @Input() fullWidth: boolean;

  @Input() align: string;
  @Input() title: string;
  @Input() img: string;
  @Input() bgImg: string;
  @Input() overflow: boolean;
  @Input() padding: number;
  @Input() view: string;
  @Input() tcGradient: string[];
  gradient: string;

  constructor() {
    this.overflow = true;
    this.fullWidth = false;
  }

  ngOnInit() {
    (this.tcGradient && this.tcGradient.length) >= 2 ? this.setGradient(this.tcGradient[0], this.tcGradient[1]) : null;
  }

  getOverflow(): string {
    return this.overflow ? 'visible' : 'auto';
  }

  setGradient(firstColor: string, secondColor: string) {
    this.gradient = `linear-gradient(to right, ${firstColor} 0%, ${secondColor} 100%)`;
  }
}
