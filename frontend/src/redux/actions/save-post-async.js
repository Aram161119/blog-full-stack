import { setPostData } from './set-post-data';
import { request } from '@/utils';

export const savePostAsync = (id, newPostData) => (dispatch) => {
	const saveRequest = id
		? request(`posts/${id}`, 'PATCH', newPostData)
		: request('posts', 'POST', newPostData);

	return saveRequest.then(({ data }) => {
		dispatch(setPostData(data));
		return data;
	});
};
