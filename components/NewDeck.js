import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { addNewDeck } from '../actions';

class NewDeck extends Component {
  state = {
    deckTitle: '',
    displayFormSuccessMessage: false,
    deckTitleFocused: false,
  };

  submitNewDeck = text => {
    this.props.dispatch(addNewDeck(this.state.deckTitle));
    this.setState({ deckTitle: '', displayFormSuccessMessage: true });
    Keyboard.dismiss();
    setTimeout(() => this.setState({ displayFormSuccessMessage: false }), 2000);
  };

  onDeckTitleFocus = () => this.setState({ deckTitleFocused: true });
  onDeckTitleBlur = () => this.setState({ deckTitleFocused: false });

  render() {
    const { deckTitle, displayFormSuccessMessage } = this.state;
    return (
      /**
       * For how to hide keyboard on touching outside of TextInput, answers had examples
       * with wrapping TouchableWithoutFeedback around main view and calling Keyboard.dismiss
       * onPress
       * https://stackoverflow.com/questions/29685421/react-native-hide-keyboard
       */
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          {displayFormSuccessMessage && (
            <Text style={{ color: 'green' }}>Deck successfully added</Text>
          )}
          <Text style={styles.formText}>
            What is the title of your new deck?
          </Text>
          <TextInput
            onChangeText={text => {
              this.setState({ deckTitle: text });
            }}
            style={[
              styles.textInput,
              this.state.deckTitleFocused && styles.focusedStyle,
            ]}
            value={deckTitle}
            onFocus={this.onDeckTitleFocus}
            onBlur={this.onDeckTitleBlur}
            onSubmitEditing={() => {
              if (deckTitle.length > 0) {
                this.submitNewDeck();
              }
            }}
          />
          <Button
            style={styles.submitButton}
            disabled={deckTitle.length === 0}
            onPress={this.submitNewDeck}
            title="Add Deck"
            color="#2884CB"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect()(NewDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 50,
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
