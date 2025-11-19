import { Icon } from '@/components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	commentsCount,
	publishedAt,
}) => {
	return (
		<div className={className}>
			<Link to={`/posts/${id}`} className="post-card">
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon size="18px" id="fa-calendar-o" margin="0 8px 0 0" />
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon size="18px" id="fa-comment-o" margin="0 8px 0 0" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& img {
		display: block;
	}

	& .post-card-footer {
		padding: 5px;
		border-top: 1px solid #000;
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
	}

	& .published-at {
		display: flex;
	}

	& .comments-count {
		display: flex;
	}

	& h4 {
		margin: 0;
	}
`;

PostCard.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
