import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = ({ className, width, ...props }) => {
	return <input className={className} {...props} />;
};

export const Input = styled(InputContainer)`
	height: 40px;
	width: ${({ width = '100%' }) => width};
	margin: 0 0 10px;
	padding: 10px;
	border: 1px solid #000;
	font-size: 18px;
`;

Input.propTypes = {
	width: PropTypes.string,
};
