/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChallenge = /* GraphQL */ `
  mutation CreateChallenge($input: ChallengeInput!) {
    createChallenge(input: $input) {
      id
      creator
      rating
      boardSize
      duration
      timeIncrement
      isRated
      createdAt
    }
  }
`;
export const deleteChallenge = /* GraphQL */ `
  mutation DeleteChallenge($id: ID!) {
    deleteChallenge(id: $id) {
      id
      creator
      rating
      boardSize
      duration
      timeIncrement
      isRated
      createdAt
    }
  }
`;
export const createGame = /* GraphQL */ `
  mutation CreateGame($input: GameInput!) {
    createGame(input: $input) {
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
  }
`;
export const finishGame = /* GraphQL */ `
  mutation FinishGame($id: ID!, $player1Won: Boolean!) {
    finishGame(id: $id, player1Won: $player1Won) {
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
  }
`;
export const sendMessage = /* GraphQL */ `
  mutation SendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      id
      text
      user
      createdAt
      gameId
    }
  }
`;
export const makeMove = /* GraphQL */ `
  mutation MakeMove($input: MoveInput!) {
    makeMove(input: $input) {
      sender
      gameId
      moveType
      x
      y
      createdAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UserInput!) {
    updateUser(input: $input) {
      id
      username
      email
      firstname
      lastname
      createdAt
      biography
      country
      city
    }
  }
`;
