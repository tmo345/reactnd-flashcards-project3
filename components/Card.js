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
import { NavigationActions } from 'react-navigation';
import { Foundation, Ionicons } from '@expo/vector-icons';

class Card extends Component {
  renderAnswerStatusIcon = answerStatus => {
    let iconName;
    let color;
    if (answerStatus === 'correct') {
      iconName = 'ios-checkmark-circle-outline';
      color = 'green';
    } else if (answerStatus === 'incorrect') {
      iconName = 'ios-close-circle-outline';
      color = 'red';
    } else {
      iconName = 'ios-radio-button-off-outline';
      color = 'blue';
    }
    return <Ionicons name={iconName} color={color} size={30} />;
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
    const currentQuestion = this.props;
    const { width } = Dimensions.get('window');
    return (
      <View style={[styles.container, { width }]}>
        <View style={styles.cardContainer}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 15,
              flexDirection: 'row',
            }}
          >
            <Text>
              {currentQuestion - 1 >= 0
                ? this.renderAnswerStatusIcon(answerStatus)
                : this.renderAnswerStatusIcon(answerStatus)}
            </Text>
          </View>
          <Text style={styles.cardText}>
            {onQuestionSide ? question : answer}
          </Text>
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
  setCurrentQuestion: position => dispatch(setCurrentQuestion(position)),
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
