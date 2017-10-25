import {
  SET_CURRENT_QUESTION,
  INCREMENT_QUESTIONS_ANSWERED,
  RESET_QUESTIONS_ANSWERED,
} from '../actions/types';

const initialQuizState = {
  currentQuestion: 1,
  quizResultsOpen: false,
  answered: 0,
};

const quiz = (state = initialQuizState, action) => {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.position,
      };

    case INCREMENT_QUESTIONS_ANSWERED:
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

export default quiz;
