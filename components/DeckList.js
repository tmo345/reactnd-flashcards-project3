import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { getDecks } from '../utils/api';
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
    const deckIds = Object.keys(decks);

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
                  <Text>{name}</Text>
                  <Text>{cards[id].length} cards</Text>
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
    borderColor: '#222',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
