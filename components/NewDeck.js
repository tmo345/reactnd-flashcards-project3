import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { addNewDeck } from '../actions';

class NewDeck extends Component {
  state = {
    deckTitle: '',
  };

  render() {
    return (
      /**
       * For how to hide keyboard on touching outside of TextInput, answers had examples
       * with wrapping TouchableWithoutFeedback around main view and calling Keyboard.dismiss
       * onPress
       * https://stackoverflow.com/questions/29685421/react-native-hide-keyboard
       */
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container}>
          <Text>What is the title of your new deck?</Text>
          <TextInput
            onChangeText={text => {
              console.log(text);
              this.setState({ deckTitle: text });
            }}
            style={styles.textInput}
            placeholder="Deck Title"
            value={this.state.deckTitle}
          />
          <TouchableOpacity
            onPress={() =>
              this.props.dispatch(addNewDeck(this.state.deckTitle))}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
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
  },
  textInput: {
    width: 100,
    borderColor: '#222',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
