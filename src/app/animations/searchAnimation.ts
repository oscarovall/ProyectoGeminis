import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const searchApear = trigger('searchApear',[
	state('show', style({
		opacity: 1,
		transform: 'translateY(0)',
		display: 'flex',
	})),
	state('hide', style({
		opacity: 0,
		transform: 'translateY(-100%)',
		display: 'none',
	})),
	transition('hide => show', animate('400ms ease-in-out')),
	transition('show => hide', animate('200ms ease-in-out')),
])