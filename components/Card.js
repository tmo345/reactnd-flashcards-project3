import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { changeAnswerStatus, setCurrentQuestion } from '../actions';
import { NavigationActions } from 'react-navigation';

class Card extends Component {
  render() {
    const { question, answer, onQuestionSide, deckId, id } = this.props.card;
    return (
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Button
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
            title="All Cards"
          />
          <Text>
            {this.props.currentQuestion}/{this.props.deckLength}
          </Text>
        </View>
        <View style={styles.cardContainer}>
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
        <View style={styles.cardNav}>
          <TouchableOpacity
            style={styles.cardNavButtons}
            onPress={() => {
              const newPosition = this.props.currentQuestion - 1;
              if (!(newPosition < 1)) {
                this.props.setCurrentQuestion(newPosition);
              }
            }}
          >
            <Text style={styles.cardNavText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardNavButtons}
            onPress={() => {
              const newPosition = this.props.currentQuestion + 1;
              if (!(newPosition > this.props.deckLength)) {
                this.props.setCurrentQuestion(this.props.currentQuestion + 1);
              }
            }}
          >
            <Text style={styles.cardNavText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ quiz, cards }, { deckId }) => {
  console.log(
    cards[deckId].slice(quiz.currentQuestion - 1, quiz.currentQuestion)
  );
  return {
    currentQuestion: quiz.currentQuestion,
    card: cards[deckId].slice(quiz.currentQuestion - 1, quiz.currentQuestion)[0]
  };
  //card: cards[deckId][cardId],
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
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardContainer: {
    borderWidth: 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 3
    },
    borderColor: '#ccc',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 60,
    margin: 10,
    marginRight: 20,
    marginLeft: 20
  },
  cardNav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
    //paddingTop: 20,
    //paddingBottom: 20,
  },
  cardNavButtons: {
    flex: 1,
    padding: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#222'
  },
  cardNavText: {
    textAlign: 'center'
  },
  cardText: {
    textAlign: 'center'
  }
});
