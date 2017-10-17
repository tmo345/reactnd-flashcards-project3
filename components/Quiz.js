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

const createCardStackDrawer = deck => {
  const deckArray = Object.values(deck);
  const navConfig = deckArray.reduce((config, card, index) => {
    config[`Card${index + 1}`] = {
      screen: props => <Card {...props} card={card} />,
    };
    return config;
  }, {});
  return DrawerNavigator(navConfig, {
    contentComponent: props => (
      <ScrollView>
        <QuizCardDrawer activeBackgroundColor="red" {...props} deck={deck} />
      </ScrollView>
    ),
  });
};

export default class Quiz extends Component {
  render() {
    const Nav = createCardStackDrawer(this.props.navigation.state.params.deck);
    return <Nav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
