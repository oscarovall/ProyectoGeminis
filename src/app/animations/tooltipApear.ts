import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const tooltip = trigger('tooltip',[
	state('show', style({
		opacity: 1,
		display: 'block'
	})),
	state('hide', style({
		opacity: 0,
		display: 'none'
	})),
	transition('hide => show', animate('300ms ease-in-out')),
	transition('show => hide', animate('200ms ease-in-out')),
])