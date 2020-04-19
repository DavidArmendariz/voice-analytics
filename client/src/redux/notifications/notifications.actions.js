import NotificationsActionTypes from "./notifications.types";

export const fetchNotificationsStart = (customerUID) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_STATUS_START,
  customerUID,
});

export const fetchNotificationsSuccess = (notifications) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_STATUS_SUCCESS,
  notifications,
});

export const fetchNotificationsFailure = (errorMessage) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_STATUS_FAILURE,
  payload: errorMessage,
});

export const fetchNotificationsByDateStart = (startDate, endDate) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_DATE_START,
  startDate,
  endDate,
});

export const fetchNotificationsByDateSuccess = (notifications) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_DATE_SUCCESS,
  notifications,
});

export const fetchNotificationsByDateFailure = (errorMessage) => ({
  type: NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_DATE_FAILURE,
  errorMessage,
});
