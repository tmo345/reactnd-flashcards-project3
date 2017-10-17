export const CHANGE_ANSWER_STATUS = 'CHANGE_ANSWER_STATUS';
export const changeAnswerStatus = (status, deckId, cardId) => ({
  type: CHANGE_ANSWER_STATUS,
  status,
  deckId,
  cardId,
});

