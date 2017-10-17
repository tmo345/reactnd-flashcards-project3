import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Foundation } from '@expo/vector-icons';

export default class QuizCardDrawer extends Component {
  state = {
    activeCard: 'Card1',
  };

  renderIcon = answerStatus => {
    let iconName;
    let color;
    if (answerStatus === 'correct') {
      iconName = 'check';
      color = 'green';
    } else if (answerStatus === 'incorrect') {
      iconName = 'x';
      color = 'red';
    } else {
      iconName = 'minus';
      color = 'blue';
    }
    return <Foundation name={iconName} color={color} size={15} />;
  };
  render() {
    return (
      <ScrollView>
        {this.props.deck.map((card, index) => {
          const cardName = `Card${index + 1}`;
          return (
            <View
              key={index}
              style={{
                flex: 1,
                backgroundColor:
                  cardName === this.state.activeCard ? 'gray' : 'white',
              }}
            >
              <Text
                style={{ padding: 20 }}
                onPress={() => {
                  const navigationAction = NavigationActions.navigate({
                    routeName: `Card${index + 1}`,
                    params: {
                      card,
                    },
                  });
                  this.props.navigation.dispatch(navigationAction);
                  this.setState({ activeCard: cardName });
                }}
              >
                Card{index + 1}
                {this.renderIcon('incorrect')}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

//const styles = StyleSheet.create({
//drawerItem: {
//backgroundColor:
//}
//})
