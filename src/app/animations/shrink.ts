import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const shrink = trigger('shrink', [
  state('active', style({
    height: '*',
    display: 'flex'
  })),
  state('inactive', style({
    display: 'none',
    height: 0
  })),
  transition('inactive => active', animate('300ms ease-in-out')),
  transition('active => inactive', animate('300ms ease-in-out'))
]);

