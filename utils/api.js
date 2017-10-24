import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY, dummyData } from './_decks';

const NOTIFICATION_SETTINGS = 'mobileflashcards:notifications';

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

export const saveDeckTitle = (name, id) => {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [id]: {
        name,
        questions: [],
      },
    }),
  );
};

export const addCardToDeck = (deckId, card) => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(JSON.parse)
    .then(results => {
      return results[deckId]['questions'].concat([card]);
    })
    .then(cardArray =>
      AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [deckId]: {
            questions: cardArray,
          },
        }),
      ),
    );
};

export const getNotificationSettings = () => {
  return AsyncStorage.getItem(NOTIFICATION_SETTINGS).then(results => {
    if (!results) {
      const defaultNotificationSettings = {
        notificationsOn: false,
      };
      AsyncStorage.setItem(
        NOTIFICATION_SETTINGS,
        JSON.stringify(defaultNotificationSettings),
      );
      return JSON.stringify(defaultNotificationSettings);
    } else {
      return results;
    }
  });
};

export const toggleNotificationsAsync = notificationsOn => {
  return AsyncStorage.mergeItem(
    NOTIFICATION_SETTINGS,
    JSON.stringify({
      notificationsOn,
    }),
  );
};
