import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Button,
} from 'react-native';
import { setNewCard } from '../actions/decks';
import FormSuccessMessage from './FormSuccessMessage';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    deck: PropTypes.object.isRequired,
  };

  state = {
    question: '',
    answer: '',
    questionFocused: false,
    answerFocused: false,
  };

  submitAddCard = () => {
    const { deckId } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    const { deck } = this.props;
    this.props.dispatch(setNewCard(deckId, question, answer)).then(() => {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Deck',
        params: { deckId: deckId, title: deck.name },
      });
      this.setState({
        question: '',
        answer: '',
      });
      this.props.navigation.dispatch(navigationAction);
    });
  };

  onQuestionFocus = () => {
    this.setState({
      questionFocused: true,
    });
  };
  onQuestionBlur = () => this.setState({ questionFocused: false });

  onAnswerFocus = () => this.setState({ answerFocused: true });
  onAnswerBlur = () => this.setState({ answerFocused: false });

  onQuestionChange = text => this.setState({ question: text });
  onAnswerChange = text => this.setState({ answer: text });

  dismissFormSuccessMessage = () =>
    this.setState({ displayFormSuccessMessage: false });

  render() {
    const { question, answer, displayFormSuccessMessage } = this.state;
    return (
      /**
       * For how to hide keyboard on touching outside of TextInput, answers had examples
       * with wrapping TouchableWithoutFeedback around main view and calling Keyboard.dismiss
       * onPress
       * https://stackoverflow.com/questions/29685421/react-native-hide-keyboard
       */
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={displayFormSuccessMessage ? -30 : -50}
        style={styles.inputContainer}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <View>
            {displayFormSuccessMessage && (
              <FormSuccessMessage
                submittedItem="Card"
                dismissFormSuccessMessage={this.dismissFormSuccessMessage}
              />
            )}
            <Text style={styles.heading}>New Flashcard</Text>
            <Text style={styles.formText}>Question</Text>
            <TextInput
              value={this.state.question}
              onChangeText={this.onQuestionChange}
              onFocus={this.onQuestionFocus}
              onBlur={this.onQuestionBlur}
              //multiline={true}
              style={[
                styles.textInput,
                this.state.questionFocused && styles.focusedStyle,
              ]}
            />
            <Text style={styles.formText}>Answer</Text>
            <TextInput
              value={this.state.answer}
              onChangeText={this.onAnswerChange}
              onFocus={this.onAnswerFocus}
              onBlur={this.onAnswerBlur}
              //multiline={true}
              style={[
                styles.textInput,
                this.state.answerFocused && styles.focusedStyle,
              ]}
            />

            <Button
              style={styles.submitButton}
              disabled={question.length === 0 || answer.length === 0}
              onPress={this.submitAddCard}
              title="Add Card"
              color="#2884CB"
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => ({
  deck: decks[navigation.state.params.deckId],
});

export default connect(mapStateToProps)(AddCard);
const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    padding: 7.5,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  formText: {
    fontSize: 16,
    paddingBottom: 15,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 30,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  submitButton: {
    paddingBottom: 20,
  },
  focusedStyle: {
    borderColor: '#84ACCB',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: '#2884CB',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
