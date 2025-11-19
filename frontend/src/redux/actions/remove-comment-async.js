import { removeComment } from './remove-comment';
import { request } from '@/utils';

export const removeCommentAsync = (commentId, postId) => (dispatch) => {
	request(`posts/${postId}/comments/${commentId}`, 'DELETE').then(() => {
		dispatch(removeComment(commentId));
	});
};
