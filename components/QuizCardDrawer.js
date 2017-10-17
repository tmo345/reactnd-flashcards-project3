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
    const cardArray = Object.values(this.props.deck);
    return (
      <ScrollView>
        {cardArray.map((card, index) => {
          const cardName = `Card${index + 1}`;
          return (
            <View
              key={index}
              style={[
                styles.drawerItem,
                {
                  backgroundColor:
                    cardName === this.state.activeCard ? 'gray' : 'white',
                },
              ]}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
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
                <Text style={styles.drawerItemText}>Card-{index + 1}</Text>
              </TouchableOpacity>
              <View>{this.renderIcon(card.answerStatus)}</View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
  },
  drawerItemText: {
    marginRight: 20,
  },
});
