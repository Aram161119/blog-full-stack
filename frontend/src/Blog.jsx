import { Error, Footer, Header, Modal } from '@/components';
import { ERROR } from '@/constants';
import { Authorization, Main, Post, Registration, Users } from '@/pages';
import { setUser } from '@/redux/actions/';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

const BlogDiv = styled.div`
	padding: 120px 0 20px;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

function Blog() {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const userData = JSON.parse(sessionStorage.getItem('userData'));

		if (!userData) return;

		dispatch(
			setUser({
				...userData,
				roleId: Number(userData.roleId),
			}),
		);
	}, []);

	return (
		<AppColumn>
			<Header />
			<BlogDiv>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="/posts/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_FOUND} />} />
				</Routes>
			</BlogDiv>
			<Footer />
			<Modal />
		</AppColumn>
	);
}

export default Blog;
