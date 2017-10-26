export const DECK_STORAGE_KEY = 'MobileFlashCards:decks';
import uuidv4 from 'uuid/v4';

const deckId = uuidv4();
const cardId1 = uuidv4();
const cardId2 = uuidv4();

export const dummyData = {
  [deckId]: {
    name: 'Potatoes',
    questions: [
      {
        id: cardId1,
        deckId,
        question: 'Are mashed potatoes awesome or amazing?',
        answer: 'Trick question! They are both awesome AND amazing!',
        answeredCategory: 'unanswered',
        onQuestionSide: true,
        answered: false,
      },
      {
        id: cardId2,
        deckId,
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
