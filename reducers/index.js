import {
  CHANGE_ANSWERED_CATEGORY,
  SET_CURRENT_QUESTION,
  FLIP_CARD,
  RESET_CARDS_IN_DECK_TO_QUESTION,
  RESET_CARDS_TO_UNANSWERED,
  TOGGLE_CARD_ANSWERED,
  ADD_NEW_DECK,
  ADD_NEW_CARD,
  OPEN_QUIZ_RESULTS,
  CLOSE_QUIZ_RESULTS,
  HYDRATE_DECKS,
  HYDRATE_NOTIFICATION_SETTINGS,
  TOGGLE_NOTIFICATIONS,
  INCREMENT_QUESTIONS_ANSWERED,
  RESET_QUESTIONS_ANSWERED,
} from '../actions';
import { combineReducers } from 'redux';

const initialQuizState = {
  currentQuestion: 1,
  quizResultsOpen: false,
  answered: 0,
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
    case CHANGE_ANSWERED_CATEGORY: {
      const { status, deckId, cardId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              answeredCategory: status,
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
            answeredCategory: 'unanswered',
          };
        }),
      };
    }

    case TOGGLE_CARD_ANSWERED: {
      const { deckId, cardId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              answered: !card.answered,
            };
          } else {
            return card;
          }
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

    case INCREMENT_QUESTIONS_ANSWERED:
      console.log('incrementing now');
      return {
        ...state,
        answered: state.answered + 1,
      };

    case RESET_QUESTIONS_ANSWERED:
      return {
        ...state,
        answered: 0,
      };

    default:
      return state;
  }
};

export default combineReducers({ cards, decks, quiz, notifications });
