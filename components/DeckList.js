import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

class DeckList extends Component {
  render() {
    const deckNames = Object.keys(this.props.decks);
    const decks = this.props.decks;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.deckList}>
          {deckNames.map((name, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  this.props.navigation.navigate('Deck', {
                    name,
                    deck: decks[name],
                  })}
              >
                <View style={styles.deck}>
                  <Text>{name}</Text>
                  <Text>{decks[name].length} cards</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  decks: state,
});

export default connect(mapStateToProps)(DeckList);

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
