import { Icon, Input } from '@/components';
import { PROP_TYPE } from '@/constants';
import { savePostAsync } from '@/redux/actions';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { SpecialPanel } from '../special-panel/special-panel';

const PostFormContainer = ({ className, post }) => {
	const { id, title, imageUrl, content, publishedAt } = post;
	const [titleValue, setTitleValue] = useState(title);
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isCreating = useMatch('/post');

	useLayoutEffect(() => {
		setTitleValue(title);
		setImageUrlValue(imageUrl);
	}, [title, imageUrl]);

	const onSave = () => {
		const content = contentRef.current.innerHTML;

		dispatch(
			savePostAsync(id, {
				title: titleValue,
				imageUrl: imageUrlValue,
				content,
			}),
		).then(({ id }) => navigate(`/posts/${id}`));
	};
	console.log('PostForm render', imageUrlValue);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				onChange={({ target }) => setImageUrlValue(target.value)}
				placeholder="Image..."
			/>
			<Input
				value={titleValue}
				onChange={({ target }) => setTitleValue(target.value)}
				placeholder="Title..."
			/>

			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						onClick={onSave}
						size="21px"
						id="fa-floppy-o"
						margin={isCreating ? '0' : '0 10px 0 0'}
					/>
				}
			/>

			<div
				contentEditable={true}
				suppressContentEditableWarning
				className="post-text"
				ref={contentRef}
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		white-space: pre-line;
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST,
};
