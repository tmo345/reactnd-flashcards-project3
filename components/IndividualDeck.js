import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import AddCard from './AddCard';

export default class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.deckName}>udacicards</Text>
          <Text style={styles.numberOfCards}>{3} cards</Text>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <Button
              title="Add Card"
              onPress={() =>
                this.props.navigation.navigate('AddCard', { name: 'Add Card' })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Start Quiz"
              onPress={() => this.props.navigation.navigate('Quiz')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
  deckName: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 10,
  },
  numberOfCards: {
    fontSize: 20,
    textAlign: 'center',
  },
});
