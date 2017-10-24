import uuidv4 from 'uuid/v4';
import {
  getDecks,
  saveDeckTitle,
  addCardToDeck,
  getNotificationSettings,
  toggleNotificationsAsync,
  setNotificationTimeAsync,
} from '../utils/api';

export const CHANGE_ANSWERED_CATEGORY = 'CHANGE_ANSWERED_CATEGORY';
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
export const HYDRATE_NOTIFICATION_SETTINGS = 'HYDRATE_NOTIFICATION_SETTINGS';
export const TOGGLE_NOTIFICATIONS = 'TOGGLE_NOTIFICATIONS';
export const INCREMENT_QUESTIONS_ANSWERED = 'INCREMENT_QUESTIONS_ANSWERED';
export const RESET_QUESTIONS_ANSWERED = 'RESET_QUESTIONS_ANSWERED';
export const TOGGLE_CARD_ANSWERED = 'TOGGLE_CARD_ANSWERED';

export const incrementQuestionsAnswered = () => {
  console.log('sending increment action');
  return {
    type: INCREMENT_QUESTIONS_ANSWERED,
  };
};

export const resetQuestionsAnswered = () => ({
  type: RESET_QUESTIONS_ANSWERED,
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

export const addNewDeck = (name, id) => {
  return {
    type: ADD_NEW_DECK,
    name,
    id,
  };
};

export const setNewDeck = name => {
  const id = uuidv4();
  return function(dispatch) {
    return saveDeckTitle(name, id).then(() => {
      dispatch(addNewDeck(name, id));
      return id;
    });
    return id;
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
    answeredCategory: 'unanswered',
    onQuestionSide: true,
    answered: false,
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

export const hydrateNotifcationSettings = asyncResults => ({
  type: HYDRATE_NOTIFICATION_SETTINGS,
  asyncResults,
});

export const toggleNotifications = notificationsOn => ({
  type: TOGGLE_NOTIFICATIONS,
  notificationsOn,
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

export const fetchNotificationSettings = () => {
  return function(dispatch) {
    return getNotificationSettings()
      .then(results => JSON.parse(results))
      .then(results => dispatch(hydrateNotifcationSettings(results)))
      .catch(error =>
        console.warn(
          'There was a problem fetching notificationsettings: ',
          error,
        ),
      );
  };
};

export const toggleNotificationsAsyncStorage = notificationsOn => {
  return function(dispatch) {
    toggleNotificationsAsync(notificationsOn)
      .then(results => JSON.parse(results))
      .then(results => dispatch(toggleNotifications(notificationsOn)))
      .catch(error =>
        console.warn('There was a problem toggling notifications: ', error),
      );
  };
};
