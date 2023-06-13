import CreateGameModal from '@/components/CreateGameModal';
import { API } from 'aws-amplify';
import { Button } from 'antd';
import { useState } from 'react';

export default function ChallengeBox() {
	const [modalVisible, setModalVisible] = useState(false); // Visibility of the modal to create a game
	const [challenges, setChallenges] = useState([]); // List of challenges

	function toggleModal() {
		setModalVisible(!modalVisible);
	}

	function handleChallengeClick(challenge) {
		// TODO: Join a challenge
	}

	return (
		<div id='challenge__box'>
			{challenges.map((challenge) => (
				<Challenge challenge={challenge} handleChallengeClick={handleChallengeClick} />
			))}

			<div className='button'>
				<Button
					type='primary'
					style={{
						textTransform: 'uppercase',
						marginTop: '15px',
					}}
					onClick={toggleModal}
				>
					Create a game
				</Button>
				<CreateGameModal visible={modalVisible} toggleModal={toggleModal} />
			</div>
		</div>
	);
}
