import CreateGameModal from '@/components/CreateGameModal';
import { API } from 'aws-amplify';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { getChallenges } from '@/graphql/queries';
import { onCreateChallenge, onDeleteChallenge } from '@/graphql/subscriptions';
import { deleteChallenge } from '@/graphql/mutations';
import Challenge from '@/components/Challenge';

export default function ChallengeBox({ username }) {
	const [modalVisible, setModalVisible] = useState(false); // Visibility of the modal to create a game
	const [challenges, setChallenges] = useState([]); // List of challenges

	useEffect(() => {
		API.graphql({
			query: getChallenges,
		}).then(({ data }) => {
			setChallenges(data.getChallenges.items);
		});
	}, []);

	useEffect(() => {
		const subscription = API.graphql({
			query: onCreateChallenge,
		}).subscribe({
			next: ({ value }) => {
				setChallenges(...challenges, value.data.onCreateChallenge);
			},
		});

		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const subscription = API.graphql({
			query: onDeleteChallenge,
		}).subscribe({
			next: ({ value }) => {
				setChallenges(challenges.filter((challenge) => challenge.id !== value.data.onDeleteChallenge.id));
			},
		});

		return () => subscription.unsubscribe();
	}, []);

	function toggleModal() {
		setModalVisible(!modalVisible);
	}

	function handleChallengeClick(challenge) {
		if (challenge.creator === username) {
			// delete the challenge
			try {
				API.graphql({
					query: deleteChallenge,
					variables: {
						id: challenge.id,
					},
				});
			} catch (err) {
				console.log(err);
			}
		} else {
			// TODO: Join a challenge
		}
	}

	return (
		<div id='challenge__box'>
			{challenges.map((challenge) => (
				<Challenge key={challenge.id} challenge={challenge} handleChallengeClick={handleChallengeClick} />
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
