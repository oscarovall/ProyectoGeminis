import { Component, OnInit, HostBinding, Input, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'tc-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class TCProgressComponent implements OnInit, OnChanges {
  @HostBinding('class.tc-progress') true;
  @HostBinding('class.extra-small') get getEXtraSmallSize() { return this.size == 'ex-sm' };
  @HostBinding('class.small') get getSmallSize() { return this.size == 'sm' };
  @HostBinding('class.default') get getDefaultSize() { return this.size == '' };
  @HostBinding('class.large') get getLargeSize() { return this.size == 'lg' };

  @Input() size: string;
  @Input() label: boolean;
  @Input() progress: number;
  @Input() color: string;
  @Input() border: string;
  innerProgress: number;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.innerProgress = 0;
  }

  ngOnInit() {
    this.innerProgress = this.progress;
  }

  ngOnChanges() {
    this.changeDetector.detectChanges();
    this.innerProgress = this.progress;
  }
}
