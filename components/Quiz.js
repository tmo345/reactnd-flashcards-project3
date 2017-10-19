import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Card from './Card';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import QuizCardDrawer from './QuizCardDrawer';
import { connect } from 'react-redux';
import { setCurrentQuestion } from '../actions';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  state = {
    modalOpen: false,
  };

  setModalOpen = open => {
    this.setState({ modalOpen: open });
  };

  render() {
    const { deck, cardsInDeck } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={cardsInDeck}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <Card
              deckLength={cardsInDeck.length}
              deckId={deck.id}
              card={item}
              cardNumber={index + 1}
            />
          )}
          ref={ref => {
            this.flatListRef = ref;
          }}
          horizontal={true}
          pagingEnabled={true}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalOpen}
          //onRequestClose={() => {
        >
          <View style={{ marginTop: 22 }}>
            <View>
              {cardsInDeck.map((card, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.setCurrentQuestion(index + 1);
                      this.flatListRef.scrollToIndex({ index });
                      this.setModalOpen(!this.state.modalOpen);
                    }}
                    key={index}
                  >
                    <Text>{`Card ${index + 1}`}</Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                onPress={() => {
                  this.setModalOpen(!this.state.modalOpen);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalOpen(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = ({ quiz, decks, cards }, { navigation }) => {
  const { deckId } = navigation.state.params;
  return {
    deck: decks[deckId],
    cardsInDeck: cards[deckId],
    currentQuestion: quiz.currentQuestion,
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentQuestion: position => dispatch(setCurrentQuestion(position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  nav: {
    flex: 1,
  },
});
