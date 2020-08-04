import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const subAppear = trigger('subAppear',[
	state('active', style({
		height: '*',
		display: 'block'
	})),
	state('inactive', style({
		height: 0,
		display: 'none'
	})),
	transition('inactive => active', animate('200ms ease-in-out')),
	transition('active => inactive', animate('200ms ease-in-out')),
])