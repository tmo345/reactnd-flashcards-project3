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
import { connect } from 'react-redux';

const createCardStackDrawer = (cardsInDeck, deck) => {
  const navConfig = cardsInDeck.reduce((config, card, index) => {
    const cardPosition = index + 1;
    config[`Card${index + 1}`] = {
      screen: props => (
        <Card
          {...props}
          deckLength={cardsInDeck.length}
          cardPosition={cardPosition}
          deckId={deck.id}
        />
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

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };
  render() {
    const { deck, cardsInDeck } = this.props;
    const Nav = createCardStackDrawer(cardsInDeck, deck);
    return <Nav />;
  }
}

const mapStateToProps = ({ decks, cards }, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deck: decks[deckId],
    cardsInDeck: cards[deckId],
  };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  nav: {
    flex: 1,
  },
});
