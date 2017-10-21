import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Button, Text, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { closeQuizResults } from '../actions';

const QuizResults = ({ cardsInDeck, numberCorrect, deck, dispatch }) => {
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
        <Button
          title="Take Quiz Again"
          onPress={() => dispatch(closeQuizResults())}
        />
      </View>
    </View>
  );
};

export default connect()(QuizResults);
