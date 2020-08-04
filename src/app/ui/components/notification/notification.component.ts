import { Component, OnInit, Input, Output, HostBinding, HostListener, ElementRef, ContentChild, TemplateRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { interval, timer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'tc-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class TCNotificationComponent implements OnInit, OnDestroy {
	@ContentChild('messageTemplate', { static: true }) messageTemplate: TemplateRef<any>;

	@HostBinding('class.tc-notification') true;
	@HostBinding('class.apear') get getClassApear() { return this.apear; }
	@HostBinding('class.hide') get getHide() { return !this.apear; }

  @HostBinding('class.from-top') get getFromTopAnimation() { return this.animation == 'fromTop'; }
  @HostBinding('class.from-bottom') get getFromBottomAnimation() { return this.animation == 'fromBottom'; }
  @HostBinding('class.from-right') get getFromRightAnimation() { return this.animation == 'fromRight'; }
  @HostBinding('class.from-left') get getFromLeftAnimation() { return this.animation == 'fromLeft'; }
	@HostBinding('class.fade') get getFadeAnimation() { return this.animation == 'fade'; }
	
	@HostBinding('class.notification-default') get viewDefault() { return this.view === 'default'; }
	@HostBinding('class.notification-accent') get viewAccent() { return this.view === 'accent'; }
	@HostBinding('class.notification-info') get viewInfo() { return this.view === 'info'; };
	@HostBinding('class.notification-success') get viewSuccess() { return this.view === 'success'; }
	@HostBinding('class.notification-warning') get viewWarning() { return this.view === 'warning'; }
	@HostBinding('class.notification-error') get viewError() { return this.view === 'error'; }

  @Input() content: any;
  @Input() view: string;
  @Input() title: string;
  @Input() icon: string;
  @Input() showTimeout: number;
  @Input() hideTimeout: number;
  @Input() autohide: boolean;
  @Input() progress: boolean;
  @Input() position: string;
  @Input() keepAfterRouteChange: boolean;
	@Input() animation: string;
	apear: boolean;
	destroy: boolean;
	progressWidth: number;
	hideInterval: Observable<number>;
	hideSubscription: Subscription;
  constructor( private el: ElementRef, private router: Router ) {
		this.view = 'default';
    this.title = '';
    this.showTimeout = 0;
    this.hideTimeout = 5000;
    this.autohide = true;
    this.progress = true;
    this.position = 'topRight';
    this.keepAfterRouteChange = true;
    this.animation = 'fromRight';
		this.hideInterval = interval(this.hideTimeout/100);
		this.hideSubscription = this.hideInterval
			.subscribe(() => {
				if (this.progressWidth <= 100 && this.apear) {
					this.progressWidth += 1;
				} else if (this.progressWidth >= 100 || !this.apear) {
					this.apear = false;
					setTimeout(() => {
						this.el.nativeElement.remove();
					}, 200);
				}
			});

    this.progressWidth = 0;
  }

  public showNotification(timeout: number) {
		setTimeout(() => {
			this.apear = true;
		}, timeout);
  }

  public hideNotification(timeout: number) {
		this.hideSubscription;
  }

	ngOnDestroy() {
		if (this.autohide) {
			this.hideSubscription.unsubscribe();
		}
	}

  ngOnInit() {

		if (!this.keepAfterRouteChange) {
			this.router.events
			.subscribe((event)=> {
				this.apear = false;
        setTimeout(() => {
          this.el.nativeElement.remove();
        }, 200);
			});
		}
		this.showNotification(this.showTimeout);
		if (this.autohide) {
			this.hideNotification(this.hideTimeout);
		} 
  }
}
