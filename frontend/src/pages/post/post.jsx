import { Error, PrivateContent } from '@/components';
import { ROLE } from '@/constants';
import { loadPostAsync, RESET_POST_DATA } from '@/redux/actions';
import { selectPost } from '@/redux/selectors';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Comments, PostContent, PostForm } from './components';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const isEditing = !!useMatch('/posts/:id/edit');
	const isCreating = !!useMatch('/post');
	const post = useSelector(selectPost);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [isCreating]);

	useEffect(() => {
		if (isCreating) return setLoading(false);

		dispatch(loadPostAsync(id)).then((data) => {
			setError(data.error);
			setLoading(false);
		});
	}, [id]);

	if (loading) return null;

	const SpecificPostPage =
		isEditing || isCreating ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	padding: 0 80px;
	margin: 40px 0;
`;
