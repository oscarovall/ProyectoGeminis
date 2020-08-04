import { Component, OnInit, Input } from '@angular/core';

import { INotification } from '../../../../interfaces/notification';

@Component({
  selector: 'tc-notification-layout',
  templateUrl: './notification-layout.component.html',
  styleUrls: ['./notification-layout.component.scss']
})
export class TCNotificationLayoutComponent implements OnInit {
  @Input() notifications: INotification[];

  defaultAnimation: string;
  defaultPosition: string;
  defaultView: string;
  defaulTimeout: number;

  constructor() {
    this.defaultAnimation = 'fromTop';
    this.defaultPosition = 'topRight';
    this.defaultView = 'default';
  }

  ngOnInit() {}

  public getAnimation(animation: string): string {
		return (animation === '' || animation == null || animation == undefined) ? this.defaultAnimation : animation;
  }
  public getPosition(position: string): string {
    return position == '' || null || undefined ? this.defaultPosition : position;
  }
  public getView(view: string): string {
		return (view === '' || view == null || view == undefined) ? this.defaultView : view;
  }
  public getProgress(progress: any): boolean {
		return (progress === '' || progress == null || progress == undefined) ? true : progress;
  }
  public getAutohide(autohide: any): boolean {
		return (autohide === '' || autohide == null || autohide == undefined) ? true : autohide;
  }
  public getTimeout(timeout: any): number {
		return (timeout === '' || timeout == null || timeout == undefined) ? this.defaulTimeout : timeout;
	}

	public defaultNotification(position: string): boolean {
		return position === '' || position == null || position == undefined;
	}
}
