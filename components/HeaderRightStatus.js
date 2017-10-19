import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Icon, Text, StyleSheet } from 'react-native';
import { Foundation, Ionicons } from '@expo/vector-icons';

class HeaderRightStatus extends Component {
  render() {
    const { currentQuestion, cardsInDeck } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text style={styles.currentNumber}>
          {currentQuestion}/{cardsInDeck.length}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ quiz, cards }, ownProps) => {
  return {
    currentQuestion: quiz.currentQuestion,
    cardsInDeck: cards[ownProps.deckId],
  };
};

export default connect(mapStateToProps)(HeaderRightStatus);

const styles = StyleSheet.create({
  currentNumber: {
    color: '#fff',
    padding: 5,
  },
});
