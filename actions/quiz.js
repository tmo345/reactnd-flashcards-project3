import {
  SET_CURRENT_QUESTION,
  INCREMENT_QUESTIONS_ANSWERED,
  RESET_QUESTIONS_ANSWERED
} from './types'


export const incrementQuestionsAnswered = () => {
  return {
    type: INCREMENT_QUESTIONS_ANSWERED,
  };
};

export const resetQuestionsAnswered = () => ({
  type: RESET_QUESTIONS_ANSWERED,
});


export const setCurrentQuestion = position => ({
  type: SET_CURRENT_QUESTION,
  position: position >= 1 ? position : 1,
});
