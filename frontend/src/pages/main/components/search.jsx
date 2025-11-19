import { Icon, Input } from '@/components';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const SearchContainer = ({ className, onChange, searchPhrase }) => {
	return (
		<div className={className}>
			<Input placeholder="Search..." value={searchPhrase} onChange={onChange} />
			<Icon size="21px" id="fa-search" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 3px;
		font-size: 21px;
	}
`;

Search.propTypes = {
	onChange: PropTypes.func.isRequired,
	searchPhrase: PropTypes.string.isRequired,
};
