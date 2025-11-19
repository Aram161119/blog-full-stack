import { API_WEATHER_ACCESS_KEY } from '@/constants';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [weather, setWeather] = useState('');

	useEffect(() => {
		const headers = {
			'X-Yandex-Weather-Key': API_WEATHER_ACCESS_KEY,
		};

		fetch('https://api.weather.yandex.ru/v2/forecast?lat=40.177200&lon=44.503490', {
			headers,
		})
			.then((response) => response.json())
			.then(({ fact, info }) =>
				setWeather({
					temp: fact.temp,
					feels_like: fact.feels_like,
					humidity: fact.humidity,
					season: fact.season,
					city: info.tzinfo.name.split('/')[1],
				}),
			);
	}, []);

	const date = new Date();
	const formattedDate = date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
	});

	if (!weather) return null;

	return (
		<div className={className}>
			<div>
				<P>Web developer blog</P>
				<P>hrayryan77@gmail.com</P>
			</div>
			<div>
				<P>
					{weather.city}, {formattedDate}
				</P>
				<div>
					<Div>
						<P>Temperature:</P>
						<Span> {weather.temp}°C </Span>
						<P>Feels like:</P>
						<Span> {weather.feels_like}°C </Span>
					</Div>
					<Div>
						<P>Season:</P>
						<Span> {weather.season}</Span>
						<P> Humidity:</P>
						<Span> {weather.humidity}%</Span>
					</Div>
				</div>
			</div>
		</div>
	);
};

const P = styled.p`
	font-size: 18px;
	font-weight: bold;
	margin: 0;
`;

const Div = styled.div`
	display: flex;
`;

const Span = styled.span`
	margin: 0 8px 0 4px;
`;

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	padding: 20px 40px;
	align-items: center;
	height: 120px;
	box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
