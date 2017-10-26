import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  resetCardsToUnanswered,
  resetCardsInDeckToQuestion,
} from '../actions/decks';
import { setCurrentQuestion, resetQuestionsAnswered } from '../actions/quiz';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    };
  };

  static propTypes = {
    deck: PropTypes.object.isRequired,
    cardsInDeck: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.resetQuiz();
  }

  resetQuiz = () => {
    const { deck } = this.props;
    this.props.setCurrentQuestion(1);
    this.props.resetCardsToUnanswered(deck.id);
    this.props.resetCardsInDeckToQuestion(deck.id);
    this.props.resetQuestionsAnswered();
  };

  render() {
    const { deck, cardsInDeck } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.deckInformation}>
          <Text style={styles.deckName}>{deck.name}</Text>
          <Text style={styles.numberOfCards}>{cardsInDeck.length} cards</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <Button
              title="Add Card"
              onPress={() =>
                this.props.navigation.navigate('AddCard', {
                  name: 'Add Card',
                  deckId: deck.id,
                })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Start Quiz"
              disabled={cardsInDeck.length === 0}
              onPress={() => {
                this.props.navigation.navigate('Quiz', {
                  deckId: deck.id,
                  name: deck.name,
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ decks, cards }, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deck: decks[deckId],
    cardsInDeck: cards[deckId],
  };
};

export default connect(mapStateToProps, {
  setCurrentQuestion,
  resetCardsToUnanswered,
  resetCardsInDeckToQuestion,
  resetQuestionsAnswered,
})(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 40,
  },
  deckInformation: {
    alignItems: 'flex-start',
    marginBottom: 80,
  },
  buttons: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'flex-start',
  },
  deckName: {
    fontSize: 28,
    marginBottom: 30,
  },
  numberOfCards: {
    fontSize: 18,
  },
});
