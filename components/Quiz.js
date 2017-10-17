import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import Card from './Card';

const dummyCardData = {
  question: 'Does React Native work with Android?',
  answer: 'Yes',
};

export default class Quiz extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card card={dummyCardData} />
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
});
