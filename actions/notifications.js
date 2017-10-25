import {
  HYDRATE_NOTIFICATION_SETTINGS,
  TOGGLE_NOTIFICATIONS
} from './types'
import { getNotificationSettings, toggleNotificationsAsync } from '../utils/api'

export const hydrateNotifcationSettings = asyncResults => ({
  type: HYDRATE_NOTIFICATION_SETTINGS,
  asyncResults,
});

export const toggleNotifications = notificationsOn => ({
  type: TOGGLE_NOTIFICATIONS,
  notificationsOn,
});

// Async actions

export const fetchNotificationSettings = () => {
  return function(dispatch) {
    return getNotificationSettings()
      .then(results => JSON.parse(results))
      .then(results => dispatch(hydrateNotifcationSettings(results)))
      .catch(error =>
        console.warn(
          'There was a problem fetching notificationsettings: ',
          error,
        ),
      );
  };
};

export const toggleNotificationsAsyncStorage = notificationsOn => {
  return function(dispatch) {
    toggleNotificationsAsync(notificationsOn)
      .then(results => JSON.parse(results))
      .then(results => dispatch(toggleNotifications(notificationsOn)))
      .catch(error =>
        console.warn('There was a problem toggling notifications: ', error),
      );
  };
};
