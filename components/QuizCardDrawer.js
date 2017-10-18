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
import { connect } from 'react-redux';

class QuizCardDrawer extends Component {
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
    const cardArray = Object.values(this.props.cards[this.props.deckId]);
    return (
      <ScrollView>
        {cardArray.map((card, index) => {
          const cardPosition = index + 1;
          const cardName = `Card${cardPosition}`;
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
                    routeName: `Card${cardPosition}`,
                    params: {
                      card,
                      cardPosition,
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

const mapStateToProps = ({ cards }) => ({
  cards,
});

export default connect(mapStateToProps)(QuizCardDrawer);

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
