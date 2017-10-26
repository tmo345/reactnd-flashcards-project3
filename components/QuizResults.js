import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import { resetQuestionsAnswered } from '../actions/quiz';
import PropTypes from 'prop-types';

class QuizResults extends Component {
  static navigationOptions = () => {
    return {
      headerLeft: null,
      title: 'Results',
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
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

    /**
     * Resetting questionsAnswered to 0 is necessary to avoid a bug where the app would navigate
     * back to QuizResults after arriving at the Deck view. It appears to be an issue where the Quiz
     * view's componentDidUpdate is being called as the app navigates back through the navigation
     * stack. In that call, questionsAnswered is compared to the deck length. If the values are
     * equal, the app navigates to the QuizResults view. By setting the questionsAnswered to 0, this
     * comparison returns false and the app does not navigate back to QuizResults on arrival to Deck.
     */
    this.props.dispatch(resetQuestionsAnswered(deck.id));

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
    const {
      cardsInDeck,
      numberCorrect,
      deck,
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
            total = {(numberCorrect / cardsInDeck.length * 100).toFixed(2)}%
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
