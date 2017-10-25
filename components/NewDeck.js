import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { setNewDeck } from '../actions/decks';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

class NewDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    deckTitle: '',
    displayFormSuccessMessage: false,
    deckTitleFocused: false,
  };

  submitNewDeck = () => {
    this.props.dispatch(setNewDeck(this.state.deckTitle)).then(id => {
      const navigationAction = NavigationActions.navigate({
        routeName: 'Deck',
        params: { deckId: id, title: this.state.deckTitle },
      });
      this.setState({ deckTitle: '' });
      this.props.navigation.dispatch(navigationAction);
    });
  };

  onDeckTitleFocus = () => this.setState({ deckTitleFocused: true });
  onDeckTitleBlur = () => this.setState({ deckTitleFocused: false });

  render() {
    const { deckTitle } = this.state;
    return (
      /**
       * For how to hide keyboard on touching outside of TextInput, answers had examples
       * with wrapping TouchableWithoutFeedback around main view and calling Keyboard.dismiss
       * onPress
       * https://stackoverflow.com/questions/29685421/react-native-hide-keyboard
       */
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={-80}
          style={styles.inputContainer}
        >
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
          />
          <View>
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
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  submitButton: { flex: 1 },
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
