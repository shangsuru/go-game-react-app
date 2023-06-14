import CreateGameModal from '@/components/CreateGameModal';
import { API } from 'aws-amplify';
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { getChallenges } from '@/graphql/queries';
import { onCreateChallenge, onDeleteChallenge } from '@/graphql/subscriptions';
import { deleteChallenge, createChallenge } from '@/graphql/mutations';
import Challenge from '@/components/Challenge';

export default function ChallengeBox({ username }) {
	const [modalVisible, setModalVisible] = useState(false); // Visibility of the modal to create a game
	const [challenges, setChallenges] = useState([]); // List of challenges

	useEffect(() => {
		API.graphql({
			query: getChallenges,
		})
			.then(({ data }) => {
				setChallenges(data.getChallenges.items);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const subscription = API.graphql({
			query: onCreateChallenge,
		}).subscribe({
			next: ({ value }) => {
				let challenge = value.data.onCreateChallenge;
				if (challenge.creator !== username) {
					setChallenges([...challenges, challenge]);
				}
			},
		});

		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		const subscription = API.graphql({
			query: onDeleteChallenge,
		}).subscribe({
			next: ({ value }) => {
				// TODO: sth wrong here? it deletes everything?
				let deletedChallenge = value.data.onDeleteChallenge;
				if (deletedChallenge.creator !== username) {
					setChallenges(challenges.filter((challenge) => challenge.id !== deletedChallenge.id));
				}
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
				setChallenges(challenges.filter((c) => c.id !== challenge.id));
			} catch (err) {
				console.log(err);
			}
		} else {
			// TODO: Join a challenge
		}
	}

	async function handleModalOk(selectedBoardSize, selectedTime, selectedIncrement, selectedGameMode) {
		toggleModal();
		let challenge = {
			rating: 0, // TODO: set actual rating
			boardSize: selectedBoardSize,
			duration: selectedTime,
			timeIncrement: selectedIncrement,
			isRated: selectedGameMode === 'rated',
		};

		try {
			const { data } = await API.graphql({
				query: createChallenge,
				variables: { input: challenge },
			});

			setChallenges([...challenges, data.createChallenge]);
		} catch (err) {
			console.log(err);
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
					disabled={challenges.filter((c) => c.creator === username).length > 0}
				>
					Create a game
				</Button>
				<CreateGameModal visible={modalVisible} toggleModal={toggleModal} handleModalOk={handleModalOk} />
			</div>
		</div>
	);
}
