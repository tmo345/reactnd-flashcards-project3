import { CHANGE_ANSWER_STATUS } from '../actions';
import { combineReducers } from 'redux';

const initialDeckState = {
  deckId1: {
    name: 'udacicards',
    id: 'deckId1',
  },
  //deckId2: {
  //name: 'javascript',
  //id: 'deckId2',
  //},
};

const initialCardState = {
  deckId1: {
    id1: {
      id: 'id1',
      deckId: 'deckId1',
      question: 'Does reactive native work for android',
      answer: 'Yes',
      answerStatus: 'unanswered',
      onQuestionSide: true,
    },
    id2: {
      deckId: 'deckId1',
      id: 'id2',
      question: 'What is the meaning of life?',
      answer: '42',
      answerStatus: 'correct',
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
  },
};

const cards = (state = initialCardState, action) => {
  switch (action.type) {
    case CHANGE_ANSWER_STATUS: {
      const { status, deckId, cardId } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          [cardId]: {
            ...state[deckId][cardId],
            answerStatus: status,
          },
        },
      };
    }

    default:
      return state;
  }
};

const decks = (state = initialDeckState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ cards, decks });
