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

const createCardStackDrawer = cardsInDeck => {
  const navConfig = cardsInDeck.reduce((config, card, index) => {
    config[`Card${index + 1}`] = {
      screen: props => <Card {...props} card={card} />,
    };
    return config;
  }, {});
  return DrawerNavigator(navConfig, {
    contentComponent: props => (
      <ScrollView>
        <QuizCardDrawer {...props} deck={cardsInDeck} />
      </ScrollView>
    ),
  });
};

export default class Quiz extends Component {
  render() {
    const Nav = createCardStackDrawer(
      this.props.navigation.state.params.cardsInDeck,
    );
    return <Nav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
