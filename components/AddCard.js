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
  TouchableOpacity,
  Button,
} from 'react-native';
import { addNewCard } from '../actions';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };

  state = {
    question: '',
    answer: '',
    displayFormSuccessMessage: false,
    questionFocused: false,
    answerFocused: false,
  };

  submitAddCard = () => {
    const { deckId } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    this.props.dispatch(addNewCard(deckId, question, answer));
    this.setState({
      question: '',
      answer: '',
      displayFormSuccessMessage: true,
    });
    Keyboard.dismiss();
    setTimeout(() => this.setState({ displayFormSuccessMessage: false }), 2000);
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

  render() {
    const { question, answer, displayFormSuccessMessage } = this.state;
    return (
      /**
       * For how to hide keyboard on touching outside of TextInput, answers had examples
       * with wrapping TouchableWithoutFeedback around main view and calling Keyboard.dismiss
       * onPress
       * https://stackoverflow.com/questions/29685421/react-native-hide-keyboard
       */
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          {displayFormSuccessMessage && (
            <Text style={{ color: 'green' }}>Card successfully added</Text>
          )}
          <Text style={styles.formText}>Question</Text>
          <TextInput
            value={this.state.question}
            onChangeText={this.onQuestionChange}
            onFocus={this.onQuestionFocus}
            onBlur={this.onQuestionBlur}
            multiline={true}
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
            multiline={true}
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
    );
  }
}

export default connect()(AddCard);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textInput: {
    alignSelf: 'stretch',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    padding: 7.5,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  formText: {
    fontSize: 18,
    paddingBottom: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 50,
    paddingBottom: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  submitButton: {},
  submitButtonText: {
    color: '#fff',
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
