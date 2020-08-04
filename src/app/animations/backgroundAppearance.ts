import { animate, trigger, style, state, keyframes, transition } from '@angular/animations';

export const backgroundAppearence = trigger('bgAppearence', [
	state('true', style({
		opacity: 1,
		display: 'flex'
	})),
	state('false', style({
		opacity: 0,
		display: 'none'
	})),
	transition('apear => disapear',animate('3s')),
	transition('disapear => apear',animate('3s')),
]);