import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    };
  };
  render() {
    return (
      <View>
        <View>
          <Text>udacicards</Text>
          <Text>{3} cards</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
