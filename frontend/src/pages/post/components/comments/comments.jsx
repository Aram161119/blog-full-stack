import { Icon } from '@/components';
import { PROP_TYPE, ROLE } from '@/constants';
import { addCommentAsync } from '@/redux/actions';
import { selectUserRole } from '@/redux/selectors';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { Comment } from './components/comment';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const addNewComment = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			{roleId !== ROLE.GUEST && (
				<div className="new-comment">
					<textarea
						name="comment"
						placeholder="Comment..."
						value={newComment}
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						size="18px"
						margin="0 0 0 10px"
						id="fa-paper-plane-o"
						onClick={() => addNewComment(postId, newComment)}
					/>
				</div>
			)}

			<div className="comments">
				{comments?.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						postId={postId}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 20px auto;

	& .new-comment {
		width: 100%;
		display: flex;
		margin: 20px 0 0;

		& textarea {
			width: 100%;
			height: 120px;
			resize: none;
			font-size: 18px;
		}
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.number.isRequired,
};
