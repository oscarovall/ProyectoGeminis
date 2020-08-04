import * as SettingsActions from '../actions/settings.actions';

import { ISettings } from '../../interfaces/settings';

export type SettingsActions = SettingsActions.All;

const DEFAULT_STATE: ISettings = {
	horizontalNavColor: 'dark',
	verticalNavColor: 'dark',
	showSearch: true,
	topbarStyle: 'dark',
	boxed: false
};

export function SettingsReducer(state: ISettings = DEFAULT_STATE, action: SettingsActions) {
	switch(action.type) {
		case SettingsActions.CHANGE_STYLE:
		return { 
			...state,
			topbarStyle: action.payload
		}
		case SettingsActions.CHANGE_LAYOUT_WIDTH: 
		return {
			...state,
			boxed: action.payload
		}
		case SettingsActions.CHANGE_HORIZONTAL_NAV_COLOR: 
		return {
			...state,
			horizontalNavColor: action.payload
		}
		case SettingsActions.CHANGE_VERTICAL_NAV_COLOR: 
		return {
			...state,
			verticalNavColor: action.payload
		}
		case SettingsActions.CHANGE_SEARCH_STATE: 
		return {
			...state,
			showSearch: action.payload
		}
		default: 
		return {
			...state
		}
	}
}