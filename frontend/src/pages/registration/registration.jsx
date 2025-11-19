import { request } from '@/utils';
import { Button, H2, Input } from '@/components';
import { AuthFormError } from '@/components/AuthError/auth-form-error';
import { ROLE } from '@/constants';
import { useResetForm } from '@/hooks';
import { setUser } from '@/redux/actions';
import { selectUserRole } from '@/redux/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, redirect } from 'react-router-dom';
import { styled } from 'styled-components';
import * as yup from 'yup';

const regFormScheme = yup.object().shape({
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

	passCheck: yup
		.string()
		.required('Password check is required')
		.oneOf([yup.ref('password'), null], 'Passwords not match!'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '', passCheck: '' },
		resolver: yupResolver(regFormScheme),
	});

	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const [serverError, setServerError] = useState(null);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('register', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(error);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passCheck?.message;
	const errorMessage = formError || serverError;

	if (userRole !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Registration</H2>
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
				<Input
					type="password"
					placeholder="Password check..."
					{...register('passCheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={formError}>
					Sign in
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
