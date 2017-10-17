import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Card extends Component {
  static navigationOptions = {};

  state = {
    questionSideUp: false,
    correct: 'correct',
  };
  render() {
    const { questionSideUp } = this.state;
    const { question, answer } = this.props.card;
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="All Cards"
        />
        <View>
          <Text style={styles.cardText}>
            {questionSideUp ? question : answer}
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
  cardText: {
    textAlign: 'center',
  },
});
