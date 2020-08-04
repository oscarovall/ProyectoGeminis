import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const selectShrink = trigger('shrink', [
	state('active',style({
		height: '*',
		display: 'block'
	})),
	state('inactive',style({
		height: 0,
		display: 'none',
	})),
	transition('inactive => active', animate('300ms ease-in-out')),
	transition('active => inactive', animate('100ms ease-in'))
]);

