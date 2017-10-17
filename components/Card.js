import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Card extends Component {
  state = {
    questionSideUp: false,
  };
  render() {
    const { questionSideUp } = this.state;
    const { question, answer } = this.props.card;
    return (
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
    );
  }
}
const styles = StyleSheet.create({
  cardText: {
    textAlign: 'center',
  },
});
