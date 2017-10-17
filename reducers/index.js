const initialDeckState = {
  decks: {
    deckId1: {
      name: 'udacicards',
      id: 'deckId1',
    },
    deckId2: {
      name: 'javascript',
      id: 'deckId2',
    },
  },
  cards: {
    deckId1: {
      id1: {
        id: 'id1',
        deckId: 'deckId1',
        question: 'Does reactive native work for android',
        answer: 'Yes',
        answerStatus: 'unanswered',
      },
      id2: {
        deckId: 'deckId1',
        id: 'id2',
        question: 'What is the meaning of life?',
        answer: '42',
        answerStatus: 'correct',
      },
    },
    deckId2: {
      id3: {
        deckId: 'deckId2',
        id: 'id3',
        question: 'Does reactive native work for android',
        answer: 'Yes',
        answerStatus: 'unanswered',
      },
      id4: {
        deckId: 'deckId2',
        id: 'id4',
        question: 'What is the meaning of life?',
        answer: '42',
        answerStatus: 'correct',
      },
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
