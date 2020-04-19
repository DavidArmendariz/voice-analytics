import NotificationsActionTypes from "./notifications.types";

const INITIAL_STATE = {
  notifications: [],
  notificationsByDate: [],
  isFetching: false,
  isFetchingByDate: false,
  errorMessage: undefined,
  isChangingStatus: false,
};

const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_STATUS_START:
      return {
        ...state,
        isFetching: true,
      };
    case NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_STATUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.notifications,
      };

    case NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_STATUS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_DATE_START:
      return {
        ...state,
        isFetchingByDate: true,
      };
    case NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_DATE_SUCCESS:
      return {
        ...state,
        isFetchingByDate: false,
        notificationsByDate: action.notifications,
      };
    case NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_DATE_FAILURE:
      return {
        ...state,
        isFetchingByDate: false,
        errorMessage: action.errorMessage,
      };
    case NotificationsActionTypes.CHANGE_NOTIFICATIONS_STATUS_START:
      return {
        ...state,
        isChangingStatus: true,
      };
    case NotificationsActionTypes.CHANGE_NOTIFICATIONS_STATUS_SUCCESS:
      return {
        ...state,
        isChangingStatus: false,
      };
    case NotificationsActionTypes.CHANGE_NOTIFICATIONS_STATUS_FAILURE:
      return {
        ...state,
        isChangingStatus: false,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
