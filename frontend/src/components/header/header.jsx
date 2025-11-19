import { styled } from 'styled-components';
import { ControlPanel, Logo } from './components';

const Description = styled.div`
	font-size: 18px;
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<div className={className}>
		<Logo />
		<Description>
			Web technologies
			<br />
			Coding
			<br />
			Error Analysis
		</Description>
		<ControlPanel />
	</div>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	background-color: #fff;
	z-index: 10;
`;
