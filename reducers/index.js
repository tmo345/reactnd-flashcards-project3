const initialDeckState = {
  udacicards: {
    id1: {
      id: 'id1',
      question: 'Does reactive native work for android',
      answer: 'Yes',
      answerStatus: 'unanswered',
    },
    id2: {
      id: 'id2',
      question: 'What is the meaning of life?',
      answer: '42',
      answerStatus: 'correct',
    },
  },
  javascript: {
    id3: {
      id: 'id3',
      question: 'Does reactive native work for android',
      answer: 'Yes',
      answerStatus: 'unanswered',
    },
    id4: {
      id: 'id4',
      question: 'What is the meaning of life?',
      answer: '42',
      answerStatus: 'correct',
    },
  },
};

const decks = (state = initialDeckState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default decks;
