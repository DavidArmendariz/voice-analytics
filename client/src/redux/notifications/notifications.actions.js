import NotificationsActionTypes from "./notifications.types";

export const fetchNotificationsStart = (customerUID) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_START,
  customerUID,
});

export const fetchNotificationsSuccess = (notifications) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_SUCCESS,
  notifications,
});

export const fetchNotificationsFailure = (errorMessage) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_FAILURE,
  payload: errorMessage,
});
