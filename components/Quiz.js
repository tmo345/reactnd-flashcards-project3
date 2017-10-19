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
import { changeAnswerStatus, setCurrentQuestion, flipCard } from '../actions';
import { Foundation, Ionicons } from '@expo/vector-icons';
import HeaderRightStatus from './HeaderRightStatus';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
      headerRight: (
        <HeaderRightStatus deckId={navigation.state.params.deckId} />
      ),
    };
  };

  state = {
    modalOpen: false,
  };

  setModalOpen = open => {
    this.setState({ modalOpen: open });
  };

  /**
   * Based on the response of A. Goodale at https://stackoverflow.com/a/43372523
   * The technique used in the response involves calculating the current notecard every time the
   * FlatList onMomentumScrollEnd fires. It does this by using e.nativeEvent's contentOffset and
   * layoutMeasurement properties. contentOffset.x is at 0 when you are on the first notecard and
   * the layoutMeasurement.width is equal to the width of the card (assuming as it does in this case
   * that the card is the width of the screen). With each advance the contentOffset.x increases by
   * the card width. If you divide the current contentOffset.x by the card width, you get the
   * following: Card 1: 0/width = 0, Card 2: (1 * width)/width = 1, Card 3: (2 * width)/(width) = 2,
   * etc. The results are the 0 based indices of the cards. In this program the cards are tracked
   * starting with card 1 and up, so 1 is added to the calculation to determine the current card.
   */
  onScrollEnd = e => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const currentCard =
      Math.floor(contentOffset.x / layoutMeasurement.width) + 1;
    this.props.setCurrentQuestion(currentCard);
  };
  render() {
    const { deck, cardsInDeck, currentQuestion, currentCard } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={{
            backgroundColor: '#3D5363',
            paddingTop: 7.5,
            paddingBottom: 7.5,
          }}
          onPress={() => {
            this.setModalOpen(true);
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="ios-list" color="#fff" size={30} />
            <Text style={{ marginLeft: 10, color: '#fff' }}>Card List</Text>
          </View>
        </TouchableHighlight>
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
          onMomentumScrollEnd={this.onScrollEnd}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalOpen}
          onRequestClose={() => {}}
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
        <View>
          <Button
            title="Flip Card"
            onPress={() => {
              this.props.flipCard(deck.id, currentCard.id);
            }}
          />
        </View>
        <View style={styles.markAnswerStatus}>
          <TouchableOpacity
            style={[
              styles.markAnswerStatusButtons,
              { backgroundColor: '#2E882E' },
            ]}
            onPress={() => {
              this.props.changeAnswerStatus('correct', deck.id, currentCard.id);
            }}
          >
            <Ionicons
              name="ios-checkmark-circle-outline"
              color="white"
              size={30}
            />
            <Text style={styles.markAnswerText}>Mark Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.markAnswerStatusButtons,
              { backgroundColor: '#AA3939' },
            ]}
            onPress={() =>
              this.props.changeAnswerStatus(
                'incorrect',
                deck.id,
                currentCard.id,
              )}
          >
            <Ionicons name="ios-close-circle-outline" color="white" size={30} />
            <Text style={styles.markAnswerText}>Mark Incorrect</Text>
          </TouchableOpacity>
        </View>
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
    currentCard: cards[deckId][quiz.currentQuestion - 1],
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentQuestion: position => dispatch(setCurrentQuestion(position)),
  flipCard: (deckId, cardId) => dispatch(flipCard(deckId, cardId)),
  changeAnswerStatus: (status, deckId, cardId) =>
    dispatch(changeAnswerStatus(status, deckId, cardId)),
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
