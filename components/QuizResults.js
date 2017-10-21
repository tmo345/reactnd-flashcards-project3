import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import {
  resetCardsToUnanswered,
  resetCardsInDeckToQuestion,
  closeQuizResults,
  setCurrentQuestion,
} from '../actions';

class QuizResults extends Component {
  resetQuiz = () => {
    const { dispatch, navigation, deck } = this.props;
    const { id, name } = deck;
    dispatch(resetCardsToUnanswered(id));
    dispatch(resetCardsInDeckToQuestion(id));
    dispatch(closeQuizResults());
    dispatch(setCurrentQuestion(1));

    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({
          routeName: 'Decks',
        }),
        NavigationActions.navigate({
          routeName: 'Deck',
          params: { name: deck.name, deckId: deck.id },
        }),
        NavigationActions.navigate({
          routeName: 'Quiz',
          params: { name: deck.name, deckId: deck.id },
        }),
      ],
    });
    navigation.dispatch(resetAction);
  };

  backToDeck = () => {
    const { deck, navigation, dispatch } = this.props;
    dispatch(closeQuizResults());
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Decks',
        }),
        NavigationActions.navigate({
          routeName: 'Deck',
          params: { name: deck.name, deckId: deck.id },
        }),
      ],
    });
    navigation.dispatch(resetAction);
  };

  render() {
    const { cardsInDeck, numberCorrect, deck, dispatch } = this.props;
    return (
      <View style={{ marginTop: 22 }}>
        <View>
          <Text>Quiz Results for {deck.name}</Text>
        </View>
        <View>
          <Text>
            {numberCorrect} correct / {cardsInDeck.length} total cards ={' '}
            {numberCorrect / cardsInDeck.length * 100}%
          </Text>
        </View>
        <View>
          <Button title="Take Quiz Again" onPress={this.resetQuiz} />
          <Button
            title={`Back to ${deck.name} deck`}
            onPress={this.backToDeck}
          />
        </View>
      </View>
    );
  }
}

export default connect()(withNavigation(QuizResults));
