import { Col, Row } from 'antd';
import { ClockCircleOutlined, DingdingOutlined, TrophyOutlined, UpCircleOutlined } from '@ant-design/icons';

export default function Challenge({ challenge, handleChallengeClick }) {
	return (
		<div className='challenge__items' key={challenge.id} onClick={() => handleChallengeClick(challenge)}>
			<Row justify='space-around'>
				<Col>{challenge.creator}</Col>
				<Col>
					<TrophyOutlined /> {challenge.rating}
				</Col>
				<Col>
					<UpCircleOutlined /> {challenge.boardSize}x{challenge.boardSize}
				</Col>
				<Col>
					<ClockCircleOutlined /> {challenge.duration}+{challenge.timeIncrement}
				</Col>
				<Col>
					<DingdingOutlined /> {challenge.mode}
				</Col>
			</Row>
		</div>
	);
}
