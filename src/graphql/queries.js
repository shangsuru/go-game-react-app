/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChallenges = /* GraphQL */ `
	query GetChallenges {
		getChallenges {
			items {
				id
				creator
				rating
				boardSize
				duration
				timeIncrement
				isRated
				createdAt
			}
			nextToken
		}
	}
`;
export const getActiveGame = /* GraphQL */ `
	query GetActiveGame($player1: String!, $player2: String!) {
		getActiveGame(player1: $player1, player2: $player2) {
			items {
				id
				player1
				player2
				isRated
				boardSize
				duration
				timeIncrement
				oldRatingPlayer1
				oldRatingPlayer2
				newRatingPlayer1
				newRatingPlayer2
				player1Won
				gameTerminated
				createdAt
			}
			nextToken
		}
	}
`;
export const getOwnGames = /* GraphQL */ `
	query GetOwnGames($player: String!) {
		getOwnGames(player: $player) {
			items {
				id
				player1
				player2
				isRated
				boardSize
				duration
				timeIncrement
				oldRatingPlayer1
				oldRatingPlayer2
				newRatingPlayer1
				newRatingPlayer2
				player1Won
				gameTerminated
				createdAt
			}
			nextToken
		}
	}
`;
export const getUserByUsername = /* GraphQL */ `
	query GetUserByUsername($username: String!) {
		getUserByUsername(username: $username) {
			items {
				id
				username
				firstname
				lastname
				createdAt
				biography
				country
				city
			}
		}
	}
`;
export const getUser = /* GraphQL */ `
	query GetUser {
		getUser {
			id
			firstname
			lastname
			biography
			country
			city
		}
	}
`;
