import { CHANGE_ANSWER_STATUS, SET_CURRENT_QUESTION } from '../actions';
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
