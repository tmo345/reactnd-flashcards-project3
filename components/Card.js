import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changeAnswerStatus } from '../actions';
import { NavigationActions } from 'react-navigation';

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
        <Button
          title="Next Card"
          onPress={() => {
            const navigationAction = NavigationActions.navigate({
              routeName: `Card${this.props.cardPosition + 1}`,
              params: {
                card: this.props.card,
                cardPosition: this.props.cardPosition,
              },
            });
            this.props.navigation.dispatch(navigationAction);
          }}
        />
        <Button
          title="Previous Card"
          onPress={() => {
            console.log(this.props.cardPosition);
            const navigationAction = NavigationActions.navigate({
              routeName: `Card${this.props.cardPosition - 1}`,
              params: {
                card: this.props.card,
                cardPosition: this.props.cardPosition,
              },
            });
            this.props.navigation.dispatch(navigationAction);
          }}
        />
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
