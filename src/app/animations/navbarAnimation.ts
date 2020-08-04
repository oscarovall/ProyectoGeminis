import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const navbarState = trigger('navbarState', [
	state('false', style({
		transform: 'translateX(0)'
	})),
	state('true', style({
		transform: 'translateX(15rem)'
	})),
	transition('false => true', animate('400ms ease-out')),
	transition('true => false', animate('400ms ease-out'))
])