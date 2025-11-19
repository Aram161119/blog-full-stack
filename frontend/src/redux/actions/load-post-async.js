import { setPostData } from './set-post-data';
import { request } from '@/utils';

export const loadPostAsync = (postId) => (dispatch) =>
	request(`posts/${postId}`).then(({ data }) => {
		if (data) {
			dispatch(setPostData(data));
		}

		return data;
	});
