import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default class DeckList extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.deckList}>
          <View style={styles.deck}>
            <Text>udacicards</Text>
            <Text>{3} cards</Text>
          </View>
          <View style={styles.deck}>
            <Text>udacicards</Text>
            <Text>{3} cards</Text>
          </View>
          <View style={styles.deck}>
            <Text>udacicards</Text>
            <Text>{3} cards</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    padding: 20,
    justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'flex-start'
  },
  deck: {
    alignItems: 'center',
    padding: 40,
    justifyContent: 'center',
    borderColor: '#222',
    borderWidth: StyleSheet.hairlineWidth,

  }
})
