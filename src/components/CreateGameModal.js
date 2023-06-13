import { Col, InputNumber, Modal, Radio, Row, Slider } from 'antd';
import { useState } from 'react';

export default function CreateGameModal({ visible, toggleModal }) {
	const [selectedBoardSize, setSelectedBoardSize] = useState(9); // 9x9, 13x13, 19x19
	const [selectedTime, setSelectedTime] = useState(5); // Time limit for each player between 5 - 40 min
	const [selectedIncrement, setSelectedIncrement] = useState(0); // Increment for each move between 0 - 40s
	const [selectedGameMode, setSelectedGameMode] = useState('casual'); // rated or casual games

	async function handleModalOk() {
		toggleModal();
		// TODO: Create a challenge
	}

	return (
		<Modal title='Create a game' open={visible} onOk={handleModalOk} onCancel={toggleModal}>
			<Row gutter={[0, 20]} justify='space-around'>
				<Col span={4}>Time Limit</Col>
				<Col span={8}>
					<Slider
						min={5}
						max={40}
						onChange={(v) => setSelectedTime(v)}
						value={typeof selectedTime === 'number' ? selectedTime : 5}
					/>
				</Col>
				<Col span={4}>
					<InputNumber min={5} max={40} style={{ marginLeft: 16 }} value={selectedTime} onChange={(v) => setSelectedTime(v)} />
				</Col>
			</Row>
			<Row gutter={[0, 20]} justify='space-around'>
				<Col span={4}>Increment</Col>
				<Col span={8}>
					<Slider
						min={0}
						max={40}
						onChange={(v) => setSelectedIncrement(v)}
						value={typeof selectedIncrement === 'number' ? selectedIncrement : 0}
					/>
				</Col>
				<Col span={4}>
					<InputNumber
						min={0}
						max={40}
						style={{ marginLeft: 16 }}
						value={selectedIncrement}
						onChange={(v) => setSelectedIncrement(v)}
					/>
				</Col>
			</Row>
			<Row gutter={[0, 20]} justify='space-around'>
				<Col>
					<Radio.Group value={selectedBoardSize} onChange={(e) => setSelectedBoardSize(e.target.value)}>
						<Radio.Button value={9}>Small (9x9)</Radio.Button>
						<Radio.Button value={13}>Medium (13x13)</Radio.Button>
						<Radio.Button value={19}>Large (19x19)</Radio.Button>
					</Radio.Group>
				</Col>
			</Row>
			<Row gutter={[0, 20]} justify='space-around'>
				<Col>
					<Radio.Group value={selectedGameMode} onChange={(e) => setSelectedGameMode(e.target.value)}>
						<Radio.Button value='casual'>Casual</Radio.Button>
						<Radio.Button value='rated'>Rated</Radio.Button>
					</Radio.Group>
				</Col>
			</Row>
		</Modal>
	);
}
