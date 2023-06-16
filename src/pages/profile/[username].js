import React, { useState } from 'react';
import moment from 'moment';
// import RatingChart from "../../components/RatingChart.js";
import { Row, Col } from 'antd';
import { ThunderboltOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getUserByUsername } from '../../graphql/queries';
import config from '@/aws-exports';
import { Amplify, withSSRContext } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import MenuBar from '@/components/MenuBar';
import { renderFlag } from '@/utils/countries';

Amplify.configure({ ...config, ssr: true });

function Profile({ signOut, user, biography, city, country, createdAt, firstname, lastname, username }) {
	const [wins, setWins] = useState(0);
	const [losses, setLosses] = useState(0);
	const [games, setGames] = useState([]);
	const [page, setPage] = useState(1);

	function renderRatingChanges(oldRating, newRating, won) {
		let ratingDifference = newRating - oldRating;
		let style = won ? { color: '#629923' } : { color: '#CC3233' };

		return (
			<Row>
				{oldRating}
				<span style={style}>
					{ratingDifference >= 0 ? '+' : ''}
					{ratingDifference}
				</span>
			</Row>
		);
	}

	function handlePagination(direction) {
		if (direction === 'left' && page > 1) {
			setPage(page - 1);
		}

		if (direction === 'right' && page * 7 < wins + losses) {
			setPage(page + 1);
		}
	}

	return (
		<MenuBar signOut={signOut} username={user.username}>
			<div className='container'>
				<Row>
					<Col className='profile__username'>{username}</Col>
				</Row>
				<Row>
					<Col span={12} className='profile__graph'>
						{/* <RatingChart title="Rating" ratings={ratings} /> */}
					</Col>
					<Col span={12} className='profile__info'>
						<div>
							{firstname} {lastname}
						</div>
						<div>
							<span>
								<img
									width='5%'
									alt={country}
									src={renderFlag(country)}
									style={{ marginRight: '7px', transform: 'translate(0, -0.2vw)' }}
								/>
							</span>
							{city}
							{city ? ', ' : null} {country}
						</div>
						<div>Member since {createdAt}</div>
						<div className='profile__biography'>{biography}</div>
					</Col>
				</Row>
				<Row justify='space-around' className='profile__count'>
					<Col>{wins + losses} games</Col>
					<Col>{wins} wins</Col>
					<Col>{losses} losses</Col>
				</Row>

				<div className='profile__gamelist'>
					{games.map(
						({
							player1,
							player2,
							time,
							timeIncrement,
							size,
							rated,
							oldRatingPlayer1,
							newRatingPlayer1,
							oldRatingPlayer2,
							newRatingPlayer2,
							timestamp,
							player1Won,
						}) => (
							<Row justify='space-around' className='profile__game'>
								<Col>
									<Row>
										<Col>
											<Row>
												{time}+{timeIncrement} • {size === 9 ? 'SMALL' : size === 13 ? 'MEDIUM' : 'LARGE'} •{' '}
												{rated ? 'RATED' : 'CASUAL'}
											</Row>
											<Row>{moment(timestamp).fromNow()}</Row>
										</Col>
									</Row>
								</Col>
								<Col>
									<Row gutter={[8, 8]}>
										<Col>
											<Row>{player1}</Row>
											{renderRatingChanges(oldRatingPlayer1, newRatingPlayer1, player1Won)}
										</Col>
										<Col>
											<ThunderboltOutlined />
										</Col>
										<Col>
											<Row>{player2}</Row>
											{renderRatingChanges(oldRatingPlayer2, newRatingPlayer2, !player1Won)}
										</Col>
									</Row>
								</Col>
							</Row>
						)
					)}
				</div>
				<div className='pagination'>
					<LeftOutlined onClick={() => handlePagination('left')} className='pagination__icon' />{' '}
					<RightOutlined onClick={() => handlePagination('right')} className='pagination__icon' />
				</div>
			</div>
		</MenuBar>
	);
}

export default withAuthenticator(Profile, {
	signUpAttributes: ['email'],
});

export async function getServerSideProps(context) {
	const { API } = withSSRContext(context);
	try {
		const { data } = await API.graphql({
			query: getUserByUsername,
			variables: {
				username: context.params.username,
			},
		});

		return {
			props: {
				biography: data.getUserByUsername.items[0].biography,
				city: data.getUserByUsername.items[0].city,
				country: data.getUserByUsername.items[0].country,
				createdAt: data.getUserByUsername.items[0].createdAt,
				firstname: data.getUserByUsername.items[0].firstname,
				lastname: data.getUserByUsername.items[0].lastname,
				username: data.getUserByUsername.items[0].username,
			},
		};
	} catch (err) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
}
