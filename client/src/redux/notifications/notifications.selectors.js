import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { createSelector } from "reselect";

const selectNotificationsFromStore = (store) => store.notifications;

export const selectNotifications = createSelector(
  [selectNotificationsFromStore],
  (notifications) => notifications.notifications.sort((a, b) => b.date - a.date)
);

export const selectNotificationsByDate = createSelector(
  [selectNotificationsFromStore],
  (notifications) =>
    notifications.notificationsByDate.sort((a, b) => b.date - a.date)
);

export const selectNotificationsAsTable = createSelector(
  [selectNotificationsByDate],
  (notifications) =>
    notifications
      ? notifications.map(({ date, message, seen }) => ({
          date: date.toDate().toLocaleString(),
          message,
          seen: seen ? <DoneIcon /> : <CloseIcon />,
        }))
      : null
);

export const selectNotificationById = (uid) =>
  createSelector([selectNotifications], (notifications) =>
    notifications
      ? notifications.filter((notification) => notification["uid"] === uid)[0]
      : null
  );
