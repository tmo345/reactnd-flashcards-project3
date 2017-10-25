import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { ScreenOrientation } from 'expo';
import StackNav from './navigators/StackNav';

const FlashCardsStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends React.Component {
  componentWillMount() {
    // Listed portrait in app.json, but want to force portrait for dev mode
    // TODO: Would remove this before building app for production
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    return (
      <Provider
        store={createStore(reducer, composeEnhancers(applyMiddleware(thunk)))}
      >
        <View style={styles.container}>
          <FlashCardsStatusBar
            backgroundColor="#222"
            barStyle="light-content"
          />
          <StackNav />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
