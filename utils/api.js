import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY, dummyData } from './_decks';

const resultsOrBackFillData = results => {
  console.log(results);
  if (!results) {
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));
    return JSON.stringify(dummyData);
  } else {
    return results;
  }
};

export const getDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(resultsOrBackFillData);
};
