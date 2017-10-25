import { combineReducers } from 'redux';
import quiz from './quiz';
import decks from './decks';
import cards from './cards';
import notifications from './notifications';

export default combineReducers({ cards, decks, quiz, notifications });
