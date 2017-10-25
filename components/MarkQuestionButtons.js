import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const MarkQuestionButtons = ({
  markQuestionCorrectness,
  handleAnswerTracking,
}) => (
  <View style={styles.markAnswerStatus}>
    <TouchableOpacity
      style={[styles.markAnswerStatusButtons, { backgroundColor: '#2E882E' }]}
      onPress={() => {
        markQuestionCorrectness('correct');
        handleAnswerTracking();
      }}
    >
      <Ionicons name="ios-checkmark-circle-outline" color="white" size={30} />
      <Text style={styles.markAnswerText}>Mark Correct</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.markAnswerStatusButtons, { backgroundColor: '#AA3939' }]}
      onPress={() => {
        markQuestionCorrectness('incorrect');
        handleAnswerTracking();
      }}
    >
      <Ionicons name="ios-close-circle-outline" color="white" size={30} />
      <Text style={styles.markAnswerText}>Mark Incorrect</Text>
    </TouchableOpacity>
  </View>
);

export default MarkQuestionButtons;

MarkQuestionButtons.propTypes = {
  markQuestionCorrectness: PropTypes.func.isRequired,
  handleAnswerTracking: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  markAnswerStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  markAnswerStatusButtons: {
    flexGrow: 1,
    paddingBottom: 15,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markAnswerText: {
    color: 'white',
  },
});
