import { StackNavigator } from 'react-navigation';
import Tabs from './Tabs.js';
import Deck from '../components/Deck';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';
import QuizResults from '../components/QuizResults';
import { HEADER_HEIGHT } from '../utils/helpers';

const StackNav = StackNavigator({
  Decks: {
    screen: Tabs,
    navigationOptions: {
      headerBackTitle: 'Decks',
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3D5363',
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        paddingBottom: 15,
      },
      headerBackTitle: 'Deck',
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3D5363',
        height: HEADER_HEIGHT,
        paddingBottom: 15,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: '#fff',
      headerBackTitle: 'Quiz',
      headerStyle: {
        backgroundColor: '#3D5363',
        height: HEADER_HEIGHT,
        paddingBottom: 15,
      },
      gesturesEnabled: false,
    },
  },
  QuizResults: {
    screen: QuizResults,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3D5363',
        height: HEADER_HEIGHT,
        paddingBottom: 15,
      },
      gesturesEnabled: false,
    },
  },
});

export default StackNav;
