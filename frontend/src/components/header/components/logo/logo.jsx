import { Icon } from '@/components';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 17px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
	line-height: 27px;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon size="70px" margin="0 10px 0 0" id="fa-code" />
		<div>
			<LargeText>Blog</LargeText>
			<SmallText>Web development</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;
