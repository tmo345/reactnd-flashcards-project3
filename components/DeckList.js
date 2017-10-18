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
    const { decks, cards } = this.props;
    const deckIds = Object.keys(decks);

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.deckList}>
          {deckIds.map((deckId, index) => {
            const deckName = decks[deckId]['name'];
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  this.props.navigation.navigate('Deck', {
                    deckId,
                    name: deckName,
                  })}
              >
                <View style={styles.deck}>
                  <Text>{deckName}</Text>
                  <Text>{cards[deckId].length} cards</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ decks, cards }) => ({
  decks,
  cards,
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
