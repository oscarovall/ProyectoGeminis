import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const itemSelected = trigger('itemSelected', [
	state('true', style({
		left: 0		
	})),
	state('false', style({
		left: '100%'
	})),
	transition('false => true', animate('200ms ease-in-out')),
	transition('true => false', animate('200ms ease-in-out'))
])