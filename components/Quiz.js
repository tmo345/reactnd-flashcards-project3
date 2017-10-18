import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Card from './Card';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import QuizCardDrawer from './QuizCardDrawer';

const createCardStackDrawer = (cardsInDeck, deck) => {
  const navConfig = cardsInDeck.reduce((config, card, index) => {
    const cardPosition = index + 1;
    config[`Card${index + 1}`] = {
      screen: props => (
        <Card {...props} card={card} cardPosition={cardPosition} />
      ),
    };
    return config;
  }, {});
  return DrawerNavigator(navConfig, {
    contentComponent: props => (
      <ScrollView>
        <QuizCardDrawer {...props} deckId={deck.id} />
      </ScrollView>
    ),
  });
};

export default class Quiz extends Component {
  render() {
    const Nav = createCardStackDrawer(
      this.props.navigation.state.params.cardsInDeck,
      this.props.navigation.state.params.deck,
      this.props.navigation.state.params.cardPosition,
    );
    return <Nav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  nav: {
    flex: 1,
  },
});
