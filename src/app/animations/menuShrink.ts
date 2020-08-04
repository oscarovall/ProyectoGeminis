import { trigger, style, state, animate, transition } from '@angular/animations';

export const menuShrink = trigger('menuShrink', [
  state('hiden', style({
    width: 0,
    display: 'none'
  })),
  state('shown', style({
    width: '*',
    display: 'flex'
  })),
  transition('hiden => shown', animate('200ms ease-out')),
  transition('shown => hiden', animate('200ms ease-out')),
]);
