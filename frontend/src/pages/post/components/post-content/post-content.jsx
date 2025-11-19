import { H2, Icon } from '@/components';
import { PROP_TYPE } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { SpecialPanel } from '../special-panel/special-panel';

const PostContentContainer = ({ className, post }) => {
	const { id, title, imageUrl, content, publishedAt } = post;
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>

			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						onClick={() => navigate(`/posts/${post.id}/edit`)}
						size="21px"
						id="fa-pencil-square-o"
						margin="0 10px 0 0"
					/>
				}
			/>

			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST,
};
