export const CHANGE_ANSWER_STATUS = 'CHANGE_ANSWER_STATUS';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const FLIP_CARD = 'FLIP_CARD';

export const changeAnswerStatus = (status, deckId, cardId) => ({
  type: CHANGE_ANSWER_STATUS,
  status,
  deckId,
  cardId,
});

export const setCurrentQuestion = position => ({
  type: SET_CURRENT_QUESTION,
  position,
});

export const flipCard = (deckId, cardId) => ({
  type: FLIP_CARD,
  cardId,
  deckId,
});

