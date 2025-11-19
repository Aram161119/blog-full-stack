import { PAGINATION_LIMIT } from '@/constants';
import { request } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { Pagination, PostCard, Search } from './components';
import { debounce } from './utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [lastPage, setLastPage] = useState(1);

	useEffect(() => {
		request(
			`posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { lastPage, posts } }) => {
			setLastPage(lastPage);
			setPosts(posts);
		});
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	if (!posts) return null;

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(({ id, title, imageUrl, comments, publishedAt }) => (
							<PostCard
								id={id}
								key={id}
								title={title}
								imageUrl={imageUrl}
								commentsCount={comments.length}
								publishedAt={publishedAt}
							/>
						))}
					</div>
				) : (
					<div className="posts-not-found">Posts not found</div>
				)}
			</div>

			{lastPage > 1 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}

	& .posts-not-found {
		text-align: center;
		font-size: 18px;
		margin-top: 40px;
	}

	& .posts-and-search {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
`;
