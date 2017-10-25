import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { fetchAllDecks } from '../actions/decks';
import { fetchNotificationSettings } from '../actions/notifications';

class DeckList extends Component {
  static propTypes = {
    cards: PropTypes.object.isRequired,
    decks: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(fetchAllDecks());
    this.props.dispatch(fetchNotificationSettings());
    // TODO: Remove commented out AsynStorage.clear(), which was used for testing app
    //AsyncStorage.clear();
  }

  render() {
    const { decks, cards } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.deckList}
          data={Object.values(decks)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const { name, id } = item;
            return (
              <View>
                <TouchableOpacity
                  style={styles.deck}
                  onPress={() => {
                    this.props.navigation.navigate('Deck', {
                      deckId: id,
                      name,
                    });
                  }}
                >
                  <Text style={styles.deckName}>{name}</Text>
                  <Text style={styles.cardNumber}>
                    {cards[id].length} cards
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
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
  },
  deck: {
    alignItems: 'center',
    padding: 40,
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 3,
  },
  deckName: {
    fontSize: 22,
    paddingBottom: 10,
  },
  cardNumber: {
    fontSize: 16,
  },
});
