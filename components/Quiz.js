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
import Card from './Card';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import QuizCardDrawer from './QuizCardDrawer';

const dummyCardData = {
  question: 'Does React Native work with Android?',
  answer: 'Yes',
};

const createCardStackDrawer = deck => {
  const navConfig = deck.reduce((config, card, index) => {
    config[`Card${index + 1}`] = {
      screen: props => <Card {...props} card={card} />,
    };
    return config;
  }, {});
  return DrawerNavigator(navConfig, {
    contentComponent: props => (
      <ScrollView>
        <QuizCardDrawer activeBackgroundColor="red" {...props} deck={deck} />
      </ScrollView>
    ),
  });
};

export default class Quiz extends Component {
  state = {
    deck: [
      {
        question: 'Does React Native work with Android?',
        answer: 'Yes',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
      {
        question: 'What is the meaning of life?',
        answer: '42',
        correct: null,
      },
    ],
  };

  render() {
    const { deck } = this.state;
    const Nav = createCardStackDrawer(deck);
    return <Nav />;
    //return createCardStackDrawer(deck);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
