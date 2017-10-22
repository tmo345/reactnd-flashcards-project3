import uuidv4 from 'uuid/v4';
import { getDecks, saveDeckTitle, addCardToDeck } from '../utils/api';

export const CHANGE_ANSWER_STATUS = 'CHANGE_ANSWER_STATUS';
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const FLIP_CARD = 'FLIP_CARD';
export const RESET_CARDS_IN_DECK_TO_QUESTION =
  'RESET_CARDS_IN_DECK_TO_QUESTION';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const RESET_CARDS_TO_UNANSWERED = 'RESET_CARDS_TO_UNANSWERED';
export const OPEN_QUIZ_RESULTS = 'OPEN_QUIZ_RESULTS';
export const CLOSE_QUIZ_RESULTS = 'CLOSE_QUIZ_RESULTS';
export const HYDRATE_DECKS = 'HYDRATE_DECKS';
export const FETCH_ALL_DECKS = 'FETCH_ALL_DECKS';

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

export const resetCardsInDeckToQuestion = deckId => ({
  type: RESET_CARDS_IN_DECK_TO_QUESTION,
  deckId,
});

export const addNewDeck = (title, id) => {
  return {
    type: ADD_NEW_DECK,
    title,
    id,
  };
};

export const setNewDeck = title => {
  const id = uuidv4();
  return function(dispatch) {
    return saveDeckTitle(title, id).then(results => {
      dispatch(addNewDeck(title, id));
      return id;
    });
  };
};

export const addNewCard = (deckId, card) => {
  return {
    type: ADD_NEW_CARD,
    deckId,
    card,
  };
};

export const setNewCard = (deckId, question, answer) => {
  const id = uuidv4();
  const newCard = {
    id,
    deckId,
    question,
    answer,
    answerStatus: null,
    onQuestionSide: true,
  };
  return function(dispatch) {
    return addCardToDeck(deckId, newCard).then(
      dispatch(addNewCard(deckId, newCard)),
    );
  };
};

export const openQuizResults = () => ({
  type: OPEN_QUIZ_RESULTS,
});

export const closeQuizResults = () => ({
  type: CLOSE_QUIZ_RESULTS,
});

export const resetCardsToUnanswered = deckId => ({
  type: RESET_CARDS_TO_UNANSWERED,
  deckId,
});

export const hydrateDecks = asyncResults => ({
  type: HYDRATE_DECKS,
  asyncResults,
});

// Async actions
export const fetchAllDecks = () => {
  return function(dispatch) {
    getDecks()
      .then(results => JSON.parse(results))
      .then(results => dispatch(hydrateDecks(results)))
      .catch(error =>
        console.warn('There was a problem fetching the decks: ', error),
      );
  };
};
