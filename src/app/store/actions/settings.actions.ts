import { Action } from '@ngrx/store';

export const CHANGE_STYLE = '[Menu] Change Style';
export const CHANGE_LAYOUT_WIDTH = '[Layout] Change Layout Width';
export const CHANGE_HORIZONTAL_NAV_COLOR = '[NavBar] Change Horizontal NavColor';
export const CHANGE_VERTICAL_NAV_COLOR = '[NavBar] Change VerticalNavColor';
export const CHANGE_SEARCH_STATE = '[NavBar] Change Search State';

export class ChangeStyle implements Action {
	readonly type = CHANGE_STYLE;
	constructor( public payload: string ) { }
}

export class ChangeLayoutWidth implements Action {
	readonly type = CHANGE_LAYOUT_WIDTH;
	constructor( public payload: boolean ) {  }
}

export class ChangeHorizontalNavColor implements Action {
	readonly type = CHANGE_HORIZONTAL_NAV_COLOR;
	constructor( public payload: string ) {  }
}

export class ChangeVerticalNavColor implements Action {
	readonly type = CHANGE_VERTICAL_NAV_COLOR;
	constructor( public payload: string ) {  }
}

export class ChangeSeatchState implements Action {
	readonly type = CHANGE_SEARCH_STATE;
	constructor( public payload: boolean ) {  }
}
export type All = ChangeStyle | ChangeLayoutWidth | ChangeHorizontalNavColor | ChangeVerticalNavColor | ChangeSeatchState ;
