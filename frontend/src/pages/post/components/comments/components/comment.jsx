import { Icon } from '@/components';
import { ROLE } from '@/constants';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '@/redux/actions';
import { selectUserRole } from '@/redux/selectors';
import { checkAccess } from '@/utils';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

const CommentContainer = ({ className, id, postId, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onCommentRemove = () => {
		dispatch(
			openModal({
				text: 'Are you sure you want to delete this comment?',
				onConfirm: () => {
					dispatch(removeCommentAsync(id, postId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrUser = checkAccess([ROLE.ADMIN, ROLE.USER], roleId);

	return (
		<div className={className}>
			<div className="comment">
				<div className="info-panel">
					<div className="author">
						<Icon size="18px" margin="0 10px 0 0" id="fa-user-circle-o" />
						{author}
					</div>
					<div className="published-at">
						<Icon size="18px" margin="0 10px 0 0" id="fa-calendar-o" />
						{publishedAt}
					</div>
				</div>
				<div className="content-text">{content}</div>
			</div>
			{isAdminOrUser && (
				<Icon
					size="21px"
					margin="0 0 0 10px"
					id="fa-trash-o"
					onClick={onCommentRemove}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	width: 100%;

	& .comment {
		width: 100%;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .info-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	id: PropTypes.number.isRequired,
	postId: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
