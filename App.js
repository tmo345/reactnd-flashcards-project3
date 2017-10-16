import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/DeckList';
import { Constants } from 'expo';

const FlashCardsStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlashCardsStatusBar backgroundColor="#222" barStyle="light-content" />
        <DeckList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
