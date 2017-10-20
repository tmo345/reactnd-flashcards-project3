import uuidv4 from 'uuid/v4';

export const CHANGE_ANSWER_STATUS = 'CHANGE_ANSWER_STATUS';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const FLIP_CARD = 'FLIP_CARD';
export const RESET_CARDS_IN_DECK_TO_QUESTION =
  'RESET_CARDS_IN_DECK_TO_QUESTION';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';

export const changeAnswerStatus = (status, deckId, cardId) => ({
  type: CHANGE_ANSWER_STATUS,
  status,
  deckId,
  cardId,
});

export const setCurrentQuestion = position => ({
  type: SET_CURRENT_QUESTION,
  position: position >= 1 ? position : 1,
});

export const flipCard = (deckId, cardId) => ({
  type: FLIP_CARD,
  cardId,
  deckId,
});

export const resetCardInDeckToQuestion = deckId => ({
  type: RESET_CARDS_IN_DECK_TO_QUESTION,
  deckId,
});

export const addNewDeck = name => {
  const id = uuidv4();
  return {
    type: ADD_NEW_DECK,
    name,
    id,
  };
};

export const addNewCard = (deckId, question, answer) => {
  const id = uuidv4();
  return {
    type: ADD_NEW_CARD,
    id,
    deckId,
    question,
    answer,
    answerStatus: null,
    onQuestionSide: true,
  };
};
