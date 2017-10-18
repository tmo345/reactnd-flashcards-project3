import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import AddCard from './AddCard';
import { connect } from 'react-redux';

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };
  render() {
    const { deck, cardsInDeck } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.deckName}>{deck.name}</Text>
          <Text style={styles.numberOfCards}>{cardsInDeck.length} cards</Text>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <Button
              title="Add Card"
              onPress={() =>
                this.props.navigation.navigate('AddCard', { name: 'Add Card' })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Start Quiz"
              onPress={() =>
                this.props.navigation.navigate('Quiz', { deckId: deck.id })}
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

export default connect(mapStateToProps)(IndividualDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
  deckName: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 10,
  },
  numberOfCards: {
    fontSize: 20,
    textAlign: 'center',
  },
});
