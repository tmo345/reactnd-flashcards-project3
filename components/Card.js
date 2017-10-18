import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changeAnswerStatus } from '../actions';

class Card extends Component {
  static navigationOptions = {};

  //state = {
  //questionSideUp: false,
  //correct: 'correct',
  //};
  render() {
    //const { questionSideUp } = this.state;
    const { question, answer, onQuestionSide, deckId, id } = this.props.card;
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          title="All Cards"
        />
        <View>
          <Text style={styles.cardText}>
            {onQuestionSide ? question : answer}
          </Text>
          <Button
            title={onQuestionSide ? 'Answer' : 'Question'}
            onPress={() => {}}
            //this.setState({
            //questionSideUp: !this.state.questionSideUp,
            //})
          />
        </View>
        <View>
          <Button
            title="Correct"
            onPress={() => this.props.changeAnswerStatus('correct', deckId, id)}
          <Button
            title="Incorrect"
            onPress={() =>
              this.props.changeAnswerStatus('incorrect', deckId, id)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  changeAnswerStatus: (status, deckId, cardId) =>
    dispatch(changeAnswerStatus(status, deckId, cardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

const styles = StyleSheet.create({
  cardText: {
    textAlign: 'center',
  },
});
