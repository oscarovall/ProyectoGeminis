import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @HostBinding('class.logo') true;
  @Input() src: string;
  @Input() height: number;
  @Input() width: number;

  constructor() { }

  ngOnInit() { }
}
