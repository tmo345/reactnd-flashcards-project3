import {
  HYDRATE_NOTIFICATION_SETTINGS,
  TOGGLE_NOTIFICATIONS,
} from '../actions/types';

const initialNotificationState = {
  notificationsOn: false,
};

const notifications = (state = initialNotificationState, action) => {
  switch (action.type) {
    case HYDRATE_NOTIFICATION_SETTINGS:
      return {
        notificationsOn: action.asyncResults.notificationsOn,
      };

    case TOGGLE_NOTIFICATIONS:
      return {
        notificationsOn: action.notificationsOn,
      };

    default:
      return state;
  }
};

export default notifications;
