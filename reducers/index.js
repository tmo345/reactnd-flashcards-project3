const initialDeckState = {
  udacicards: [
    {
      question: 'Does reactive native work for android',
      answer: 'Yes',
      answerStatus: 'unanswered',
    },
    {
      question: 'What is the meaning of life?',
      answer: '42',
      answerStatus: 'correct',
    },
  ],
  javascript: [
    {
      question: 'Does reactive native work for android',
      answer: 'Yes',
      answerStatus: 'unanswered',
    },
    {
      question: 'What is the meaning of life?',
      answer: '42',
      answerStatus: 'correct',
    },
  ],
};

const decks = (state = initialDeckState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default decks;
