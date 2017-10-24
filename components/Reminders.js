import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  DatePickerIOS,
  Switch,
  Animated,
  ScrollView,
  Picker,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Permissions, Notifications } from 'expo';
import moment from 'moment';
import { range } from 'ramda';
import {
  setNotificationTimeAsyncStorage,
  toggleNotificationsAsyncStorage,
} from '../actions';
import {
  setReminder,
  timeFromNow,
  DEFAULT_QUIZ_REMINDER,
} from '../utils/helpers';

class Reminders extends Component {
  state = {
    notificationPermission: null,
  };

  componentWillMount() {
    this.getNotificationPermission();
  }

  componentDidMount() {
    if (this.props.notificationsOn) {
      this.setLocalNotification();
    }
  }

  getNotificationPermission = () => {
    return Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    ).then(({ status }) => {
      if (status !== 'granted') {
        return Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        ).then(({ status }) =>
          this.setState({ notificatonPermission: status }),
        );
      }
      if (this.state.notificationPermission === null) {
        this.setState({ notificationPermission: status });
      }
    });
  };

  setLocalNotification = () => {
    const time = timeFromNow(1, 20, 0, 0);
    setReminder(DEFAULT_QUIZ_REMINDER, time, 'day');
  };

  clearNotifications() {
    Notifications.cancelAllScheduledNotificationsAsync();
  }

  render() {
    const { notificationPermission } = this.state;

    if (notificationPermission === null) {
      return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator size="large" style={{ marginBottom: 40 }} />
        </View>
      );
    }

    // See https://docs.expo.io/versions/latest/sdk/permissions.html for ios not
    // distinguishing between undetermined and denied
    if (
      notificationPermission === 'undetermined' ||
      notificationPermission === 'denied'
    ) {
      return (
        <View style={[styles.container, { alignItems: 'center' }]}>
          <Ionicons
            name="ios-alert-outline"
            size={40}
            style={{ marginBottom: 20 }}
          />
          <Text style={{ marginBottom: 5 }}>
            You need to enable notifications in your device's settings for this
            feature to work.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.reminderControls}>
          <Switch
            style={{ flex: 1 }}
            value={this.props.notificationsOn}
            onValueChange={e => {
              this.props.toggleNotificationsAsyncStorage(e);
              if (e === true) {
                this.setLocalNotification();
              } else {
                this.clearNotifications();
              }
            }}
          />
          <Text style={{ flex: 4, marginLeft: 10 }}>
            {this.props.notificationsOn
              ? 'Daily Practice Reminder On'
              : 'Daily Practice Reminder Off'}
          </Text>
        </View>
        <Text>
          Turn on to receive a reminder at 8PM every day if you haven't
          completed a quiz that day.
        </Text>
      </View>
    );
  }
}
const mapStateToProps = ({ notifications }) => ({
  notificationsOn: notifications.notificationsOn,
});

const mapDispatchToProps = dispatch => ({
  toggleNotificationsAsyncStorage: notificationsOn =>
    dispatch(toggleNotificationsAsyncStorage(notificationsOn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  reminderControls: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
});
