import { request } from '@/utils';
import { Button, H2, Input } from '@/components';
import { AuthFormError } from '@/components/AuthError/auth-form-error';
import { useResetForm } from '@/hooks';
import { setUser } from '@/redux/actions';
import { selectUserRole } from '@/redux/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { styled } from 'styled-components';
import * as yup from 'yup';
import { ROLE } from '@/constants';

const authFormScheme = yup.object().shape({
	login: yup
		.string()
		.required('Login is required')
		.matches(/^[a-zA-Z0-9_ ]+$/, 'Login can only contain letters, numbers and _')
		.min(3, 'Login must be at least 3 characters')
		.max(15, 'Login must be at most 15 characters'),

	password: yup
		.string()
		.required('Password is required')
		.matches(/^[\w#%]+$/, 'Password can only contain letters, numbers, _, #, %')
		.min(6, 'Password must be at least 6 characters')
		.max(30, 'Password must be at most 30 characters'),
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '' },
		resolver: yupResolver(authFormScheme),
	});

	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const [serverError, setServerError] = useState(null);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Request error: ${error}`);
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (userRole !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Authorization</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Login..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={formError}>
					Sign in
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Registration</StyledLink>
			</form>
		</div>
	);
};

const StyledLink = styled(Link)`
	text-align: center;
	margin: 20px 0;
	text-decoration: underline;
	font-size: 18px;
`;

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
