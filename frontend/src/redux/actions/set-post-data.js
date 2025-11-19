import { ACTION_TYPE } from './action-type';

export const setPostData = (data) => ({
	type: ACTION_TYPE.SET_POST_DATA,
	payload: data,
});
