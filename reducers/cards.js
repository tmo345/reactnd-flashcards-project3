import {
  CHANGE_ANSWERED_CATEGORY,
  FLIP_CARD,
  RESET_CARDS_IN_DECK_TO_QUESTION,
  ADD_NEW_DECK,
  ADD_NEW_CARD,
  RESET_CARDS_TO_UNANSWERED,
  TOGGLE_CARD_ANSWERED,
  HYDRATE_DECKS,
} from '../actions/types';

const cards = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ANSWERED_CATEGORY: {
      const { status, deckId, cardId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              answeredCategory: status,
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
        question,
        answer,
        answeredCategory,
        onQuestionSide,
        answered,
      } = action.card;
      const { deckId } = action;
      return {
        ...state,
        [deckId]: [
          ...state[deckId],
          {
            id,
            deckId,
            question,
            answer,
            answeredCategory,
            answered,
            onQuestionSide,
          },
        ],
      };
    }

    case RESET_CARDS_TO_UNANSWERED: {
      const { deckId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          return {
            ...card,
            answeredCategory: 'unanswered',
          };
        }),
      };
    }

    case TOGGLE_CARD_ANSWERED: {
      const { deckId, cardId } = action;
      return {
        ...state,
        [deckId]: state[deckId].map(card => {
          if (card.id === cardId) {
            return {
              ...card,
              answered: !card.answered,
            };
          } else {
            return card;
          }
        }),
      };
    }

    case HYDRATE_DECKS: {
      const { asyncResults } = action;
      const deckIds = Object.keys(asyncResults);
      return deckIds.reduce((cardState, deckId) => {
        cardState[deckId] = asyncResults[deckId]['questions'];
        return cardState;
      }, {});
    }

    default:
      return state;
  }
};

export default cards;
