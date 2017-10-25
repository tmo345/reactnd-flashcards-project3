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
      <View style={styles.container}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.resultsHeading}>Deck:</Text>
          <Text style={styles.resultsText}>{deck.name}</Text>
        </View>

        <View style={{ marginTop: 15, marginBottom: 15 }}>
          <Text style={styles.resultsHeading}>Score:</Text>
          <Text style={styles.resultsText}>
            {numberCorrect} correct / {cardsInDeck.length} card{cardsInDeck.length === 1 ? '' : 's'}{' '}
            total = {numberCorrect / cardsInDeck.length * 100}%
          </Text>
        </View>
        <View style={{ alignItems: 'flex-start', marginTop: 20 }}>
          <TouchableOpacity
            style={styles.navigationButtons}
            onPress={this.retakeQuiz}
          >
            <Text style={styles.navButtonText}>Take Quiz Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationButtons}
            onPress={this.backToDeck}
          >
            <Text style={styles.navButtonText}>Back to {deck.name} deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(withNavigation(QuizResults));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  navigationButtons: {
    padding: 10,
    marginBottom: 15,
  },
  navButtonText: {
    color: '#3B62F7',
    fontSize: 18,
  },
  resultsHeading: {
    fontSize: 20,
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 16,
  },
});
