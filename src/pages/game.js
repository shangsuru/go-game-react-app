import Board from '@/components/gameBoard/Board';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Chat from '@/components/gameBoard/Chat';
import PlayerInfo from '@/components/gameBoard/PlayerInfo';
import { useState } from 'react';

export default function GameWindow() {
	const boardSize = 9; // TODO
	const canvasSize = getCanvasSize(); // TODO
	const username = 'myusername'; // TODO
	const [currentPlayer, setCurrentPlayer] = useState('black');
	const [boardState, setBoardState] = useState(new Array(boardSize * boardSize).fill(null));

	function getCanvasSize() {
		let boardToScreenRatio = 0.85;
		let smallerAxis = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
		return smallerAxis * boardToScreenRatio > 400 ? smallerAxis * boardToScreenRatio : 400;
	}

	function onTimeout() {
		console.log('timeout');
	}

	return (
		<>
			{/*<Prompt when={winner === null} message='Warning: You lose when leaving the game!' />*/}
			<div className='gameView'>
				<div className='gamewindow-header'>
					<div style={{ padding: '5px' }}>
						<img src={'/ReactGo.png'} alt='React_Go' />
						ReactGo
					</div>
				</div>
				<div>
					<Row>
						<Col span={12}>
							<div className='boardview'>
								<Board
									boardSize={boardSize}
									onClick={(x, y) => console.log(x, y)} // TODO
									boardState={boardState}
									currentPlayer={currentPlayer}
									boardHW={canvasSize} // TODO: make this dynamic
								/>
							</div>
						</Col>
						<Col>
							<div
								style={{
									margin: '30px',
									display: 'flex',
									flexDirection: 'column',
									alignContent: 'center',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '20px',
									backgroundColor: '#262320',
									borderRadius: '10px',
									minHeight: `${canvasSize * 0.7}px`,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignContent: 'space-between',
										width: '100%',
									}}
								>
									<PlayerInfo
										color='#f5f9ff'
										name='Test1'
										country='Japan'
										rating={1200}
										time={15}
										increment={3}
										onTimeout={onTimeout}
									/>
									<PlayerInfo
										color='#383b40'
										name='Test2'
										country='China'
										rating={800}
										time={15}
										increment={3}
										onTimeout={onTimeout}
									/>
								</div>
								<Chat user={username} />
							</div>
						</Col>
					</Row>
				</div>
				{/*this.gameEnded(this.p1)*/}
			</div>
		</>
	);
}
