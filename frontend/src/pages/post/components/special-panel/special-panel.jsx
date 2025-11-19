import { Icon } from '@/components';
import { ROLE } from '@/constants';
import { CLOSE_MODAL, openModal, removePostAsync } from '@/redux/actions';
import { selectUserRole } from '@/redux/selectors';
import { checkAccess } from '@/utils';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isCreating = useMatch('/post');
	const roleId = useSelector(selectUserRole);

	const onPostRemove = () => {
		dispatch(
			openModal({
				text: 'Are you sure you want to delete this post?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<div className="special-panel">
				{!isCreating && (
					<div className="published-at">
						<Icon size="18px" id="fa-calendar-o" margin="0 8px 0 0" />
						{publishedAt}
					</div>
				)}

				{isAdmin && (
					<div className="buttons-panel">
						{editButton}
						{!isCreating && (
							<Icon size="21px" id="fa-trash-o" onClick={onPostRemove} />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .buttons-panel {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .published-at {
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: -20px 0 20px;
		font-size: 18px;
		width: 100%;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.number.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
