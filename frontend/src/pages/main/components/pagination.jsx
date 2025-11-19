import { Button } from '@/components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationContainer = ({ className, setPage, page, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				Start
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Prev
			</Button>
			<div className="current-page">Page: {page}</div>
			<Button disabled={lastPage === page} onClick={() => setPage(page + 1)}>
				Next
			</Button>
			<Button disabled={lastPage === page} onClick={() => setPage(lastPage)}>
				End
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 0 20px;
	padding: 0 35px;

	& button {
		margin: 0 5px;
		padding: 0 30px;
	}

	& .current-page {
		width: 100px;
		height: 32px;
		font-size: 18px;
		line-height: 26px;
		text-align: center;
		border: 1px solid #000;
		font-weight: 500;
	}
`;

Pagination.propTypes = {
	setPage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
};
