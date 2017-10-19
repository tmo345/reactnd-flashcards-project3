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
import { Foundation } from '@expo/vector-icons';

class Card extends Component {
  renderAnswerStatusIcon = answerStatus => {
    let iconName;
    let color;
    if (answerStatus === 'correct') {
      iconName = 'check';
      color = 'green';
    } else if (answerStatus === 'incorrect') {
      iconName = 'x';
      color = 'red';
    } else {
      iconName = 'minus';
      color = 'blue';
    }
    return <Foundation name={iconName} color={color} size={15} />;
  };

  render() {
    const {
      question,
      answer,
      onQuestionSide,
      answerStatus,
      deckId,
      id,
    } = this.props.card;
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
          <Text>Status: {this.renderAnswerStatusIcon(answerStatus)}</Text>
        </View>
        <View>
          <Button
            title="Flip Card"
            onPress={() => this.props.flipCard(deckId, id)}
          />
        </View>
        <View style={styles.markAnswerStatus}>
          <TouchableOpacity
            style={styles.markAnswerStatusButtons}
            onPress={() => {
              this.props.changeAnswerStatus('correct', deckId, id);
            }}
          >
            {this.renderAnswerStatusIcon('correct')}
            <Text>Mark Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.markAnswerStatusButtons}
            onPress={() =>
              this.props.changeAnswerStatus('incorrect', deckId, id)}
          >
            {this.renderAnswerStatusIcon('incorrect')}
            <Text>Mark Incorrect</Text>
          </TouchableOpacity>
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
  markAnswerStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  markAnswerStatusButtons: {
    paddingBottom: 15,
    paddingTop: 15,
  },
});
