import React, { Component } from 'react';
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
import { setLocalNotification } from '../utils/localNotification';
import moment from 'moment';
import { range } from 'ramda';

class Reminders extends Component {
  state = {
    notificationPermission: null,
    notificationsOn: false,
    opacity: new Animated.Value(0),
    height: new Animated.Value(0),
    hour: new Date().getHours().toString(),
    minute: new Date().getMinutes().toString(),
    amOrPM: new Date().getHours() <= 12 ? 'AM' : 'PM',
  };

  componentWillMount() {
    this.getNotificationPermission();
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

  setNotificationTime = () => {
    const { hour, minute, amOrPM } = this.state;
    let formattedHour = amOrPM === 'PM' ? parseInt(hour) + 12 : parseInt(hour);
    const currentDateTime = Date.now();
    let notificationTime = new Date();
    notificationTime.setDate(notificationTime.getDate());
    notificationTime.setHours(formattedHour);
    notificationTime.setMinutes(parseInt(minute));
    notificationTime.setSeconds(0);

    if (notificationTime <= currentDateTime) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }
    this.setState({ notificationTime });
    return notificationTime;
  };

  setLocalNotification = () => {
    const notificationTime = this.setNotificationTime();

    Notifications.cancelAllScheduledNotificationsAsync();

    const notification = {
      title: 'Have you taken a quiz today?',
      body: 'Practice some more by taking another quiz!',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      },
    };

    Notifications.scheduleLocalNotificationAsync(notification, {
      time: new Date(notificationTime),
      repeat: 'day',
    });
  };

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
    const { opacity, height, notificationTime } = this.state;
    return (
      <View style={styles.container}>
        <Text>Daily Reminder</Text>
        <Switch
          value={this.state.notificationsOn}
          onValueChange={() => {
            if (this.state.notificationsOn === false) {
              Animated.timing(height, { toValue: 300, speed: 6 }).start();
              Animated.timing(opacity, { toValue: 1, duration: 500 }).start();
            } else {
              Animated.spring(height, { toValue: 0, speed: 12 }).start();
              Animated.timing(opacity, { toValue: 0, duration: 500 }).start();
            }
            this.setState({ notificationsOn: !this.state.notificationsOn });
            //this.initialNotificatonTimeSet();
          }}
        />
        <Animated.View
          style={{
            opacity,
            height,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={styles.timePickerHeading}>Hour</Text>
              <Picker
                selectedValue={this.state.hour}
                onValueChange={value => {
                  this.setState({ hour: value });
                  this.setNotificationTime();
                }}
              >
                {range(1, 13)
                  .map(number => number.toString())
                  .map(hour => (
                    <Picker.Item key={hour} label={hour} value={hour} />
                  ))}
              </Picker>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={styles.timePickerHeading}>Minute</Text>
              <Picker
                selectedValue={this.state.minute}
                onValueChange={value => {
                  this.setState({ minute: value });
                  this.setNotificationTime();
                }}
              >
                {range(0, 61)
                  .map(number => number.toString().padStart(2, '0'))
                  .map(minute => (
                    <Picker.Item key={minute} label={minute} value={minute} />
                  ))}
              </Picker>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={styles.timePickerHeading}>AM/PM</Text>
              <Picker
                selectedValue={this.state.amOrPM}
                onValueChange={value => {
                  this.setState({ amOrPM: value });
                  this.setNotificationTime();
                }}
              >
                <Picker.Item key="am" label="AM" value="AM" />
                <Picker.Item key="pm" label="PM" value="PM" />
              </Picker>
            </View>
          </View>
          {/*<Text>
            {notificationTime !== null
              ? moment(notificationTime).format(
                  'MMMM Do [Quiz reminder daily at] h:mm A',
                )
              : null}
          </Text>
          <DatePickerIOS
            style={{ padding: 20 }}
            mode="datetime"
            minimumDate={moment()
              .add(1, 'minutes')
              .toDate()}
            maximumDate={moment()
              .add(1, 'days')
              .toDate()}
            onDateChange={date => {
              console.log(date);
              this.setState({ date: moment(date) });
            }}
            date={this.state.date.toDate()}
          />
          */}
          <View style={{ flex: 1 }}>
            <Button
              title="Set Daily Reminder"
              onPress={() => {
                this.setLocalNotification();
              }}
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default Reminders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  timePickerHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
