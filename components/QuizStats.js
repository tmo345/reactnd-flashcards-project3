import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const QuizStats = ({
  currentQuestion,
  deckLength,
  questionsAnswered,
  questionsRemaining,
}) => (
  <View
    style={{
      backgroundColor: '#3D5363',
      paddingTop: 7.5,
      paddingBottom: 7.5,
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={styles.quizInfo}>Answered: {questionsAnswered}</Text>
      <Text style={styles.quizInfo}>
        Card {currentQuestion}/{deckLength}
      </Text>
      <Text style={styles.quizInfo}>Remaining: {questionsRemaining}</Text>
    </View>
  </View>
);

QuizStats.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  deckLength: PropTypes.number.isRequired,
  questionsAnswered: PropTypes.number.isRequired,
  questionsRemaining: PropTypes.number.isRequired,
};

export default QuizStats;

const styles = StyleSheet.create({
  quizInfo: {
    color: '#fff',
    padding: 5,
  },
});
