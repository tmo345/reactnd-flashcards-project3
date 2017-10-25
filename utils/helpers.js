import { Notifications } from 'expo';

export const HEADER_HEIGHT = 60;

export const DEFAULT_QUIZ_REMINDER = {
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

export const timeFromNow = (days, hours, minutes, seconds) => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + days);
  tomorrow.setHours(hours, minutes, seconds);
  return new Date(tomorrow);
};

const clearNotifications = () => {
  Notifications.cancelAllScheduledNotificationsAsync();
};

export const setReminder = (reminder, time, repeatFrequency) => {
  clearNotifications();
  Notifications.scheduleLocalNotificationAsync(reminder, {
    time: time,
    repeat: repeatFrequency,
  });
};
