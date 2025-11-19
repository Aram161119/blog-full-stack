import { Icon } from '@/components';
import { ROLE } from '@/constants';
import { logout } from '@/redux/actions';
import { selectUserLogin, selectUserRole } from '@/redux/selectors';
import { checkAccess } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const RightAligned = styled.div`
	height: 40px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const Button = styled.button`
	font-size: 18px;
	width: 100px;
	padding: 8px 16px;
	cursor: pointer;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Sign in</Link>{' '}
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />

				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="10px 0 0 15px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 15px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
