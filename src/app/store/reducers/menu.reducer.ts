import * as MenuActions from '../actions/menu.actions';

export type Action = MenuActions.All;

const DEFAULT_STATE = false;

export function MenuReducer(state: boolean = DEFAULT_STATE, action: Action) {
	switch (action.type) {
    case MenuActions.OPEN: {
      return true;
    }
    case MenuActions.CLOSE: {
      return false;
    }
    default: {
      return false;
    }
	}
}
