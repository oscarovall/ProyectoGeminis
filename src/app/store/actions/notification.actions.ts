import { Action } from '@ngrx/store';

import { INotification } from '../../interfaces/notification';

export const TEST = ' Test';
export const ADD_ONE = 'Add';
export const DELETE = 'Delete';

export class Test implements Action {
	readonly type = TEST;
}

export class AddOne implements Action {
	readonly type = ADD_ONE;
	constructor(public payload: INotification) { }
}  

export class Delete implements Action {
	readonly type = DELETE;
	constructor(public payload: INotification) { }
}

export type All = AddOne | Delete | Test;