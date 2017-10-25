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
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  changeAnsweredCategory,
  setCurrentQuestion,
  flipCard,
  toggleCardAnswered,
  incrementQuestionsAnswered,
  resetCardsInDeckToQuestion,
  resetQuestionsAnswered,
  resetCardsToUnanswered,
} from '../actions';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import QuizResults from './QuizResults';
import QuizStats from './QuizStats';
import CardList from './CardList';
import {
  setReminder,
  timeFromNow,
  DEFAULT_QUIZ_REMINDER,
} from '../utils/helpers';
import PropTypes from 'prop-types';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  static propTypes = {
    cardsInDeck: PropTypes.array.isRequired,
    changeAnsweredCategory: PropTypes.func.isRequired,
    currentCard: PropTypes.object.isRequired,
    currentQuestion: PropTypes.number.isRequired,
    deck: PropTypes.object.isRequired,
    flipCard: PropTypes.func.isRequired,
    incrementQuestionsAnswered: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    notificationsOn: PropTypes.bool.isRequired,
    questionsAnswered: PropTypes.number.isRequired,
    quizResultsOpen: PropTypes.bool.isRequired,
    resetCardsInDeckToQuestion: PropTypes.func.isRequired,
    resetCardsToUnanswered: PropTypes.func.isRequired,
    resetQuestionsAnswered: PropTypes.func.isRequired,
    setCurrentQuestion: PropTypes.func.isRequired,
    toggleCardAnswered: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    if (this.props.questionsAnswered === this.props.cardsInDeck.length) {
      if (this.props.notificationsOn) {
        this.delayQuizReminder();
      }
      this.navigateToQuizResults();
    }
  }
  componentDidMount() {
    this.resetQuiz();
  }

  resetQuiz = () => {
    const { deck } = this.props;
    this.props.setCurrentQuestion(1);
    this.props.resetCardsToUnanswered(deck.id);
    this.props.resetCardsInDeckToQuestion(deck.id);
    this.props.resetQuestionsAnswered();
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

  markQuestionCorrectness = correctness => {
    this.props.changeAnsweredCategory(
      correctness,
      this.props.deck.id,
      this.props.currentCard.id,
    );
  };

  handleAnswerTracking = () => {
    if (!this.props.currentCard.answered) {
      this.props.toggleCardAnswered(
        this.props.deck.id,
        this.props.currentCard.id,
      );
      this.props.incrementQuestionsAnswered();
    }
  };

  delayQuizReminder = () => {
    const time = timeFromNow(1, 20, 0, 0);
    setReminder(DEFAULT_QUIZ_REMINDER, time, 'day');
  };

  navigateToQuizResults = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'QuizResults',
      params: {
        cardsInDeck: this.props.cardsInDeck,
        deck: this.props.deck,
        numberCorrect: this.props.cardsInDeck.filter(
          card => card.answeredCategory === 'correct',
        ).length,
      },
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const {
      deck,
      cardsInDeck,
      currentQuestion,
      currentCard,
      navigation,
      questionsAnswered,
    } = this.props;

    const deckLength = cardsInDeck.length;
    const questionsRemaining = deckLength - questionsAnswered;
    return (
      <View style={styles.container}>
        <QuizStats
          questionsAnswered={questionsAnswered}
          questionsRemaining={questionsRemaining}
          currentQuestion={currentQuestion}
          deckLength={deckLength}
        />
        <CardList
          cardsInDeck={cardsInDeck}
          onScrollEnd={this.onScrollEnd}
          renderListItem={({ item, index }) => (
            <Card
              deckLength={cardsInDeck.length}
              deckId={deck.id}
              card={item}
              cardNumber={index + 1}
            />
          )}
        />
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => {
            this.props.flipCard(deck.id, currentCard.id);
          }}
        >
          <MaterialCommunityIcons name="rotate-3d" size={30} />
          <Text style={styles.flipButtonText}>Flip</Text>
        </TouchableOpacity>
        <View style={styles.markAnswerStatus}>
          <TouchableOpacity
            style={[
              styles.markAnswerStatusButtons,
              { backgroundColor: '#2E882E' },
            ]}
            onPress={() => {
              this.markQuestionCorrectness('correct');
              this.handleAnswerTracking();
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
            onPress={() => {
              this.markQuestionCorrectness('incorrect');
              this.handleAnswerTracking();
            }}
          >
            <Ionicons name="ios-close-circle-outline" color="white" size={30} />
            <Text style={styles.markAnswerText}>Mark Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (
  { quiz, decks, cards, notifications },
  { navigation },
) => {
  const { deckId } = navigation.state.params;
  return {
    deck: decks[deckId],
    cardsInDeck: cards[deckId],
    currentQuestion: quiz.currentQuestion,
    currentCard: cards[deckId][quiz.currentQuestion - 1],
    quizResultsOpen: quiz.quizResultsOpen,
    questionsAnswered: quiz.answered,
    notificationsOn: notifications.notificationsOn,
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentQuestion: position => dispatch(setCurrentQuestion(position)),
  flipCard: (deckId, cardId) => dispatch(flipCard(deckId, cardId)),
  changeAnsweredCategory: (status, deckId, cardId) =>
    dispatch(changeAnsweredCategory(status, deckId, cardId)),
  toggleCardAnswered: (deckId, cardId) =>
    dispatch(toggleCardAnswered(deckId, cardId)),
  incrementQuestionsAnswered: () => dispatch(incrementQuestionsAnswered()),
  resetCardsInDeckToQuestion: deckId =>
    dispatch(resetCardsInDeckToQuestion(deckId)),
  resetQuestionsAnswered: () => dispatch(resetQuestionsAnswered()),
  resetCardsToUnanswered: deckId => dispatch(resetCardsToUnanswered(deckId)),
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
  flipButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonText: {
    fontSize: 22,
    marginLeft: 7.5,
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
