import {
  CHANGE_ANSWER_STATUS,
  SET_CURRENT_QUESTION,
  FLIP_CARD,
  RESET_CARDS_IN_DECK_TO_QUESTION,
  RESET_CARDS_TO_UNANSWERED,
  ADD_NEW_DECK,
  ADD_NEW_CARD,
  OPEN_QUIZ_RESULTS,
  CLOSE_QUIZ_RESULTS,
  HYDRATE_DECKS,
  HYDRATE_NOTIFICATION_SETTINGS,
  TOGGLE_NOTIFICATIONS,
} from '../actions';
import { combineReducers } from 'redux';

const initialQuizState = {
  currentQuestion: 1,
  quizResultsOpen: false,
};

const initialNotificationState = {
  notificationsOn: false,
};

const notifications = (state = initialNotificationState, action) => {
  switch (action.type) {
    case HYDRATE_NOTIFICATION_SETTINGS:
      return {
        notificationsOn: action.asyncResults.notificationsOn,
      };

    case TOGGLE_NOTIFICATIONS:
      return {
        notificationsOn: action.notificationsOn,
      };

    default:
      return state;
  }
};

const cards = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ANSWER_STATUS: {
      const { status, deckId, cardId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              answerStatus: status,
            };
          } else {
            return card;
          }
        }),
      };
    }

    case FLIP_CARD: {
      const { deckId, cardId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              onQuestionSide: !card.onQuestionSide,
            };
          } else {
            return card;
          }
        }),
      };
    }

    case RESET_CARDS_IN_DECK_TO_QUESTION: {
      const { deckId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          return {
            ...card,
            onQuestionSide: true,
          };
        }),
      };
    }

    case ADD_NEW_DECK: {
      const { id } = action;
      return {
        ...state,
        [id]: [],
      };
    }

    case ADD_NEW_CARD: {
      const {
        id,
        question,
        answer,
        answerStatus,
        onQuestionSide,
      } = action.card;
      const { deckId } = action;
      return {
        ...state,
        [deckId]: [
          ...state[deckId],
          { id, deckId, question, answer, answerStatus, onQuestionSide },
        ],
      };
    }

    case RESET_CARDS_TO_UNANSWERED: {
      const { deckId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          return {
            ...card,
            answerStatus: 'unanswered',
          };
        }),
      };
    }

    case HYDRATE_DECKS: {
      const { asyncResults } = action;
      const deckIds = Object.keys(asyncResults);
      return deckIds.reduce((cardState, deckId) => {
        cardState[deckId] = asyncResults[deckId]['questions'];
        return cardState;
      }, {});
    }

    default:
      return state;
  }
};

const decks = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_DECK: {
      const { id, name } = action;
      return {
        ...state,
        [id]: {
          id,
          name,
        },
      };
    }

    case HYDRATE_DECKS: {
      console.log('async', action);
      const deckIds = Object.keys(action.asyncResults);
      return deckIds.reduce((deckState, deckId) => {
        deckState[deckId] = {
          id: deckId,
          name: action.asyncResults[deckId]['name'],
        };
        return deckState;
      }, {});
    }

    default:
      return state;
  }
};

const quiz = (state = initialQuizState, action) => {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.position,
      };

    case OPEN_QUIZ_RESULTS:
      return {
        ...state,
        quizResultsOpen: true,
      };

    case CLOSE_QUIZ_RESULTS:
      return {
        ...state,
        quizResultsOpen: false,
      };

    default:
      return state;
  }
};

export default combineReducers({ cards, decks, quiz, notifications });
