import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import devToolsEnhancer from 'remote-redux-devtools';

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
      header: (
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#2A7F40',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 20 }}>
            Flashcards Project
          </Text>
        </View>
      ),
    },
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#222',
      activeBackgroundColor: '#2A7F40',
      inactiveBackgroundColor: '#ddd',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        height: 64,
        backgroundColor: 'gray',
      },
    },
  },
);

const StackNav = StackNavigator(
  {
    Decks: {
      screen: Tabs,
      navigationOptions: {
        headerBackTitle: 'Back',
      },
    },
    Deck: {
      screen: Deck,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: 'gray',
          height: 50,
          justifyContent: 'center',
          paddingBottom: 15,
        },
        headerBackTitle: 'Back',
      },
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: 'gray',
          height: 50,
          paddingBottom: 15,
        },
      },
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: 'gray',
          height: 50,
          paddingBottom: 15,
        },
      },
    },
  },
  {
    //headerMode: 'float',
  },
);

export default class App extends React.Component {
  render() {
    return (
      <Provider
        store={createStore(
          reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        )}
      >
        <View style={styles.container}>
          <FlashCardsStatusBar
            backgroundColor="#222"
            barStyle="light-content"
          />
          <StackNav />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
