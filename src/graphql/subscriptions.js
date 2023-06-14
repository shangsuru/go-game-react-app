/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChallenge = /* GraphQL */ `
  subscription OnCreateChallenge {
    onCreateChallenge {
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
export const onDeleteChallenge = /* GraphQL */ `
  subscription OnDeleteChallenge {
    onDeleteChallenge {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($challengeId: ID) {
    onCreateGame(challengeId: $challengeId) {
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
export const onSendMessage = /* GraphQL */ `
  subscription OnSendMessage($gameId: ID) {
    onSendMessage(gameId: $gameId) {
      id
      text
      user
      createdAt
      gameId
    }
  }
`;
export const onMakeMove = /* GraphQL */ `
  subscription OnMakeMove($gameId: ID) {
    onMakeMove(gameId: $gameId) {
      sender
      gameId
      moveType
      x
      y
      createdAt
    }
  }
`;
