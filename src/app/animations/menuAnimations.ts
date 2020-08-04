import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const toggleMenu = trigger('toggleMenu', [
	state('false', style({
		transform: 'translate3d(0, 0, 0)'
	})),
	state('true', style({
		transform: 'translate3d(100%, 0, 0)'
	})),
	transition('false => true', animate('200ms ease-in-out')),
	transition('true => false', animate('200ms ease-in-out'))
])

