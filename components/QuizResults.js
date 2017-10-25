import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import {
  resetCardsToUnanswered,
  resetCardsInDeckToQuestion,
  closeQuizResults,
  setCurrentQuestion,
  resetQuestionsAnswered,
} from '../actions';

class QuizResults extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
    return {
      headerLeft: null,
      title: 'Results',
    };
  };

  navigateToNewQuiz = () => {
    const { navigation } = this.props;
    const { deck: { id, name } } = navigation.state.params;
    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({
          routeName: 'Decks',
        }),
        NavigationActions.navigate({
          routeName: 'Deck',
          params: { name: name, deckId: id },
        }),
        NavigationActions.navigate({
          routeName: 'Quiz',
          params: { name: name, deckId: id },
        }),
      ],
    });
    navigation.dispatch(resetAction);
  };

  retakeQuiz = () => {
    this.navigateToNewQuiz();
  };

  backToDeck = () => {
    const { navigation } = this.props;
    const { deck } = navigation.state.params;
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
    console.log(this.props);
    const {
      cardsInDeck,
      numberCorrect,
      deck,
      dispatch,
    } = this.props.navigation.state.params;
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
          <Button title="Take Quiz Again" onPress={this.retakeQuiz} />
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
