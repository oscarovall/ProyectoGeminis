import * as NotificationActions from '../actions/notification.actions';
import { INotificationState } from '../../interfaces/notification.state'
import { INotification } from '../../interfaces/notification';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export type Action = NotificationActions.All;

export const getNotificationState = createFeatureSelector<INotificationState>('notifications');
export const getNotifications = (state: INotificationState) => state.notifications;

export const getAllNotifications = createSelector(
	getNotificationState,
	(state: INotificationState) => state.notifications
);


export const INITIAL_STATE: INotificationState = {
	notifications: [ ]
};

export function NotificationReducer(state = INITIAL_STATE, action: Action) {
	switch(action.type) {
		case NotificationActions.ADD_ONE: {
			const NEW_NOTIFICATION: INotification = action.payload;
			return {
				...state,
				notifications: [...state.notifications, NEW_NOTIFICATION]
			}
		}
		case NotificationActions.DELETE: {
			return {
				...state,
				notifications: [state.notifications.filter((element: INotification) => {
					return element != action.payload
				})]
			}
		}
		case NotificationActions.TEST : {
		}
		default: {
			return state
		}
	}
}