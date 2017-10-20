import {
  CHANGE_ANSWER_STATUS,
  SET_CURRENT_QUESTION,
  FLIP_CARD,
  RESET_CARDS_IN_DECK_TO_QUESTION,
  ADD_NEW_DECK,
  ADD_NEW_CARD,
} from '../actions';
import { combineReducers } from 'redux';

const initialDeckState = {
  deckId1: {
    name: 'Udacicards',
    id: 'deckId1',
  },
  //deckId2: {
  //name: 'javascript',
  //id: 'deckId2',
  //},
};

const initialCardState = {
  deckId1: [
    {
      id: 'id1',
      deckId: 'deckId1',
      question: 'Does reactive native work for android',
      answer: 'Yes',
      answerStatus: 'unanswered',
      onQuestionSide: true,
    },
    {
      deckId: 'deckId1',
      id: 'id2',
      question: 'What is the meaning of life?',
      answer: '42',
      answerStatus: 'correct',
      onQuestionSide: true,
    },
    {
      deckId: 'deckId1',
      id: 'id3',
      question: 'What is 2 + 2?',
      answer: '4',
      answerStatus: 'incorrect',
      onQuestionSide: true,
    },
    //deckId2: {
    //id3: {
    //deckId: 'deckId2',
    //id: 'id3',
    //question: 'Does reactive native work for android',
    //answer: 'Yes',
    //answerStatus: 'unanswered',
    //},
    //id4: {
    //deckId: 'deckId2',
    //id: 'id4',
    //question: 'What is the meaning of life?',
    //answer: '42',
    //answerStatus: 'correct',
    //},
    //},
  ],
};

const initialQuizState = {
  currentQuestion: 1,
};

const cards = (state = initialCardState, action) => {
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
        deckId,
        question,
        answer,
        answerStatus,
        onQuestionSide,
      } = action;
      return {
        ...state,
        [deckId]: [
          ...state[deckId],
          { id, deckId, question, answer, answerStatus, onQuestionSide },
        ],
      };
    }

    default:
      return state;
  }
};

const decks = (state = initialDeckState, action) => {
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

    default:
      return state;
  }
};

const quiz = (state = initialQuizState, action) => {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
      return {
        currentQuestion: action.position,
      };

    default:
      return state;
  }
};

export default combineReducers({ cards, decks, quiz });
