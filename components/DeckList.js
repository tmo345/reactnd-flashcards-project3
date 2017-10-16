import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default class DeckList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.deckList}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Deck', { name: 'udacicards' })}
          >
            <View style={styles.deck}>
              <Text>udacicards</Text>
              <Text>{3} cards</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Deck', { name: 'udacicards' })}
          >
            <View style={styles.deck}>
              <Text>udacicards</Text>
              <Text>{3} cards</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Deck', { name: 'udacicards' })}
          >
            <View style={styles.deck}>
              <Text>udacicards</Text>
              <Text>{3} cards</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'flex-start',
  },
  deck: {
    alignItems: 'center',
    padding: 40,
    justifyContent: 'center',
    borderColor: '#222',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
