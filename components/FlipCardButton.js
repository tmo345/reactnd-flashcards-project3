import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const FlipCardButton = ({ flipCard, deckId, cardId }) => (
  <TouchableOpacity
    style={styles.flipButton}
    onPress={() => {
      flipCard(deckId, cardId);
    }}
  >
    <MaterialCommunityIcons name="rotate-3d" size={30} />
    <Text style={styles.flipButtonText}>Flip</Text>
  </TouchableOpacity>
);

export default FlipCardButton;

FlipCardButton.propTypes = {
  flipCard: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  flipButton: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonText: {
    fontSize: 22,
    marginLeft: 7.5,
  },
});
