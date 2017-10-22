import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY, dummyData } from './_decks';

const resultsOrBackFillData = results => {
  if (!results) {
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));
    // stringify dummyData since if not set yet, the dummyData is passed to fetchAllCards action,
    // which tries to parse the data. If not stringified first, throws an error.
    return JSON.stringify(dummyData);
  } else {
    return results;
  }
};

export const getDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(resultsOrBackFillData);
};

export const saveDeckTitle = (title, id) => {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [id]: {
        title,
        questions: [],
      },
    }),
  );
};
