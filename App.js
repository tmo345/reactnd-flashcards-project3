import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import IndividualDeck from './components/IndividualDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const FlashCardsStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tabs = TabNavigator(
  {
    DecksList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: Platform.OS === 'ios' ? '#222' : '#000',
      inactiveBackgroundColor: '#ddd',
      activeBackgroundColor: 'gray',
      style: {
        height: 56,
        backgroundColor: 'gray',
      },
    },
  },
);

const StackNav = StackNavigator({
  Decks: {
    screen: Tabs,
  },
  Deck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'gray',
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'gray',
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: 'gray',
      },
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlashCardsStatusBar backgroundColor="#222" barStyle="light-content" />
        <StackNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
