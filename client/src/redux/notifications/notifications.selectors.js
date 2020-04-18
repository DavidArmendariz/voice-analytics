import { createSelector } from "reselect";

const selectNotificationsFromStore = (store) => store.notifications;

export const selectNotifications = createSelector(
  [selectNotificationsFromStore],
  (notifications) => notifications.notifications.sort((a, b) => b.date - a.date)
);

export const selectNotificationsAsTable = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications
      ? notifications.map(({ date, message }) => ({
          date: date.toDate().toLocaleString(),
          message,
        }))
      : null
);

export const selectNotificationById = (uid) =>
  createSelector([selectNotifications], (notifications) =>
    notifications
      ? notifications.filter((notification) => notification["uid"] === uid)[0]
      : null
  );
