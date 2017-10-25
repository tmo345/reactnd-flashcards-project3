export const DECK_STORAGE_KEY = 'MobileFlashCards:decks';

export const dummyData = {
  deckId1: {
    name: 'Potatoes',
    questions: [
      {
        id: 'id1',
        question: 'Are mashed potatoes awesome or amazing?',
        answer: 'Trick question! They are both awesome AND amazing!',
        answeredCategory: 'unanswered',
        onQuestionSide: true,
        answered: false,
      },
      {
        id: 'id2',
        question:
          "True or False: A twice baked potato, or potato boat, is a fancy way of serving mashed potatoes without having to say we're having mashed potatoes",
        answer:
          "Very very true. Also accept answer: Who cares? At least we're having mashed potatoes for dinner!",
        answeredCategory: 'unanswered',
        onQuestionSide: true,
        answered: false,
      },
    ],
  },
};
