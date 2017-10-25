import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import AddCard from './AddCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    resetCardsInDeckToQuestion: PropTypes.func.isRequired,
    setCurrentQuestion: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => ({
  resetCardsInDeckToQuestion: deckId =>
    dispatch(resetCardsInDeckToQuestion(deckId)),
  setCurrentQuestion: position => dispatch(setCurrentQuestion(position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 40,
    //paddingBottom: 80,
    //paddingTop: 90,
  },
  deckInformation: {
    alignItems: 'flex-start',
    marginBottom: 80,
  },
  buttons: {
    //flex: 1,
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
