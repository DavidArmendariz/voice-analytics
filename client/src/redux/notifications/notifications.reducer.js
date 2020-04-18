import NotificationsActionTypes from "./notifications.types";

const INITIAL_STATE = {
  notifications: [],
  isFetching: false,
  errorMessage: undefined,
};

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationsActionTypes.FETCH_NOTIFICATIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case NotificationsActionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.notifications
      };

    case NotificationsActionTypes.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
