import React from 'react';
import { TabNavigator } from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import DeckList from '../components/DeckList';
import NewDeck from '../components/NewDeck';
import Reminders from '../components/Reminders';
import { HEADER_HEIGHT } from '../utils/helpers';

const Tabs = TabNavigator(
  {
    DecksList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={30} color={tintColor} />
        ),
      },
    },
    Reminders: {
      screen: Reminders,
      navigationOptions: {
        topBarLabel: 'Reminders',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-clock-outline" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: (
        <View
          style={{
            height: HEADER_HEIGHT,
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#3D5363',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, paddingLeft: 20 }}>
            Flashcards Project
          </Text>
        </View>
      ),
    },
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#222',
      activeBackgroundColor: '#3D5363',
      inactiveBackgroundColor: '#f8f7f7',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        height: 64,
        backgroundColor: 'gray',
      },
    },
  },
);

export default Tabs;
