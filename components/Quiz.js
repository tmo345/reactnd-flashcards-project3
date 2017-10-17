import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class Quiz extends Component {
  state = {
    questionSideUp: false,
  };
  render() {
    const { questionSideUp } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.cardText}>
            {questionSideUp ? 'Does React Native work with Android?' : 'Yes'}
          </Text>
          <Button
            title={questionSideUp ? 'Answer' : 'Question'}
            onPress={() =>
              this.setState({
                questionSideUp: !this.state.questionSideUp,
              })}
          />
        </View>
        <View>
          <Button title="Correct" onPress={() => {}} />
          <Button title="Incorrect" onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cardText: {
    textAlign: 'center',
  },
});
