import { ADD_NEW_DECK, HYDRATE_DECKS } from '../actions/types';

const decks = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_DECK: {
      const { id, name } = action;
      return {
        ...state,
        [id]: {
          id,
          name,
        },
      };
    }

    case HYDRATE_DECKS: {
      const deckIds = Object.keys(action.asyncResults);
      return deckIds.reduce((deckState, deckId) => {
        deckState[deckId] = {
          id: deckId,
          name: action.asyncResults[deckId]['name'],
        };
        return deckState;
      }, {});
    }

    default:
      return state;
  }
};

export default decks;
