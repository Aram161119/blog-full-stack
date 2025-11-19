import { H2, PrivateContent } from '@/components';
import { ROLE } from '@/constants';
import { selectUserRole } from '@/redux/selectors';
import { checkAccess } from '@/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { TableRow, UserRow } from './components';
import { request } from '@/utils';

const UsersContainer = ({ className }) => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [shouldUpdateUsersList, setShouldUpdateUsersList] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;

		Promise.all([request('users'), request('users/roles')]).then(
			([usersResp, rolesResp]) => {
				if (usersResp?.error || rolesResp?.error) {
					setErrorMessage(usersResp.error || rolesResp.error);
					return;
				}

				setUsers(usersResp?.data);
				setRoles(rolesResp?.data);
			},
		);
	}, [shouldUpdateUsersList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;

		request(`users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUsersList(!shouldUpdateUsersList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Users</H2>
				<TableRow>
					<div className="login-column">Login</div>
					<div className="registered-column">Registration date</div>
					<div className="role-column">Role</div>
				</TableRow>
				{users?.map(({ id, login, registeredAt, roleId }) => (
					<UserRow
						key={id}
						id={id}
						login={login}
						registeredAt={registeredAt}
						roleId={roleId}
						roles={roles}
						onUserRemove={() => onUserRemove(id)}
					/>
				))}
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;
`;
