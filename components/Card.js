import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { changeAnswerStatus, setCurrentQuestion, flipCard } from '../actions';
import { NavigationActions } from 'react-navigation';

class Card extends Component {
  render() {
    console.log(this.props);
    const { question, answer, onQuestionSide, deckId, id } = this.props.card;
    const { width } = Dimensions.get('window');
    return (
      <View style={[styles.container, { width }]}>
        <View style={styles.cardContainer}>
          <Text style={styles.currentNumber}>
            {this.props.cardNumber}/{this.props.deckLength}
          </Text>
          <Text style={styles.cardText}>
            {onQuestionSide ? question : answer}
          </Text>
        </View>
        <View>
          <Button
            title={onQuestionSide ? 'Answer' : 'Question'}
            onPress={() => this.props.flipCard(deckId, id)}
          />
          <Button
            title="Correct"
            onPress={() => {
              this.props.changeAnswerStatus('correct', deckId, id);
            }}
          />
          <Button
            title="Incorrect"
            onPress={() =>
              this.props.changeAnswerStatus('incorrect', deckId, id)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ quiz, cards }, { deckId }) => {
  return {
    currentQuestion: quiz.currentQuestion,
  };
};
const mapDispatchToProps = dispatch => ({
  changeAnswerStatus: (status, deckId, cardId) =>
    dispatch(changeAnswerStatus(status, deckId, cardId)),
  setCurrentQuestion: position => dispatch(setCurrentQuestion(position)),
  flipCard: (deckId, cardId) => dispatch(flipCard(deckId, cardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  cardHeader: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  cardContainer: {
    flex: 1,
    //alignSelf: 'stretch',
    borderWidth: 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderColor: '#ccc',
    //padding: 20,
    paddingTop: 60,
    paddingBottom: 60,
    margin: 0,
  },
  cardNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //paddingTop: 20,
    //paddingBottom: 20,
  },
  cardNavButtons: {
    //flex: 1,
    padding: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#222',
  },
  cardNavText: {
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
  },
  currentNumber: {
    marginRight: 20,
    fontSize: 14,
  },
  allCardsButton: {
    padding: 20,
  },
});
