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
  };

  submitNewDeck = text => {
    this.props.dispatch(addNewDeck(this.state.deckTitle));
    this.setState({ deckTitle: '', displayFormSuccessMessage: true });
    Keyboard.dismiss();
    setTimeout(() => this.setState({ displayFormSuccessMessage: false }), 2000);
  };

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
        <KeyboardAvoidingView behavior="position" style={styles.container}>
          {displayFormSuccessMessage && (
            <Text style={{ color: 'green' }}>Deck successfully added</Text>
          )}
          <View style={styles.inputContainer}>
            <Text style={styles.formText}>
              What is the title of your new deck?
            </Text>
            <TextInput
              onChangeText={text => {
                this.setState({ deckTitle: text });
              }}
              style={styles.textInput}
              value={deckTitle}
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
        </KeyboardAvoidingView>
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
    //width: 200,
    alignSelf: 'stretch',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    marginBottom: 10,
  },
  formText: {
    fontSize: 18,
    paddingBottom: 20,
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: 100,
  },
  submitButton: {},
  submitButtonText: {
    color: '#fff',
  },
});
