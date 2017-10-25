import uuidv4 from 'uuid/v4';
import {
  CHANGE_ANSWERED_CATEGORY,
  FLIP_CARD,
  ADD_NEW_CARD,
  RESET_CARDS_TO_UNANSWERED,
  RESET_CARDS_IN_DECK_TO_QUESTION,
  HYDRATE_DECKS,
  TOGGLE_CARD_ANSWERED,
  ADD_NEW_DECK,
} from './types';
import { addCardToDeck, saveDeckTitle, getDecks } from '../utils/api';

// Synchronous Actions
export const addNewDeck = (name, id) => {
  return {
    type: ADD_NEW_DECK,
    name,
    id,
  };
};

export const hydrateDecks = asyncResults => ({
  type: HYDRATE_DECKS,
  asyncResults,
});

export const resetCardsToUnanswered = deckId => ({
  type: RESET_CARDS_TO_UNANSWERED,
  deckId,
});

export const resetCardsInDeckToQuestion = deckId => ({
  type: RESET_CARDS_IN_DECK_TO_QUESTION,
  deckId,
});

export const addNewCard = (deckId, card) => {
  return {
    type: ADD_NEW_CARD,
    deckId,
    card,
  };
};

export const flipCard = (deckId, cardId) => ({
  type: FLIP_CARD,
  cardId,
  deckId,
});

export const changeAnsweredCategory = (status, deckId, cardId) => ({
  type: CHANGE_ANSWERED_CATEGORY,
  status,
  deckId,
  cardId,
});

export const toggleCardAnswered = (deckId, cardId) => ({
  type: TOGGLE_CARD_ANSWERED,
  deckId,
  cardId,
});

// Asynchronous Actions
export const setNewCard = (deckId, question, answer) => {
  const id = uuidv4();
  const newCard = {
    id,
    deckId,
    question,
    answer,
    answeredCategory: 'unanswered',
    onQuestionSide: true,
    answered: false,
  };
  return function(dispatch) {
    return addCardToDeck(deckId, newCard)
      .then(dispatch(addNewCard(deckId, newCard)))
      .catch(error =>
        console.warn('There was a problem settings the new card', error),
      );
  };
};

export const setNewDeck = name => {
  const id = uuidv4();
  return function(dispatch) {
    return saveDeckTitle(name, id)
      .then(() => {
        dispatch(addNewDeck(name, id));
        return id;
      })
      .catch(error =>
        console.warn('There was a problem setting the new deck title', error),
      );
  };
};

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
