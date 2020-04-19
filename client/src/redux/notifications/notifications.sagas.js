import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  auth,
  firestore,
  getDocumentsFromSnapshot,
} from "../../firebase/firebase.utils";
import NotificationsActionTypes from "./notifications.types";
import {
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  fetchNotificationsByDateSuccess,
  fetchNotificationsByDateFailure,
  changeNotificationsStatusFailure,
  changeNotificationsStatusSuccess,
} from "./notifications.actions";

export function* fetchNotificationsByStatus() {
  try {
    const customerUID = yield auth.currentUser.uid;
    const notificationsReference = firestore
      .collection("customers")
      .doc(customerUID)
      .collection("notifications")
      .where("seen", "==", false);
    const notificationsSnapshot = yield notificationsReference.get();
    const notifications = yield call(
      getDocumentsFromSnapshot,
      notificationsSnapshot
    );
    yield put(fetchNotificationsSuccess(notifications));
  } catch (error) {
    console.log(`Error in fetchNotifications: ${error}`);
    yield put(fetchNotificationsFailure(error.message));
  }
}

export function* fetchNotificationsByDate({ startDate, endDate }) {
  try {
    const customerUID = yield auth.currentUser.uid;
    const notificationsReference = firestore
      .collection("customers")
      .doc(customerUID)
      .collection("notifications")
      .where("date", ">=", startDate)
      .where("date", "<=", endDate);
    const notificationsSnapshot = yield notificationsReference.get();
    const notifications = yield call(
      getDocumentsFromSnapshot,
      notificationsSnapshot
    );
    yield put(fetchNotificationsByDateSuccess(notifications));
  } catch (error) {
    console.log(`Error in fetchNotificationsByDate: ${error}`);
    yield put(fetchNotificationsByDateFailure(error.message));
  }
}

export function* changeNotificationsStatus({ notificationUID }) {
  try {
    console.log("Intercepted");
    const customerUID = yield auth.currentUser.uid;
    yield firestore
      .collection("customers")
      .doc(customerUID)
      .collection("notifications")
      .doc(notificationUID)
      .update({
        seen: true,
      });
    yield put(changeNotificationsStatusSuccess());
  } catch (error) {
    console.log(`Error in changeNotificationsStatus: ${error}`);
    yield put(changeNotificationsStatusFailure(error.message));
  }
}

export function* fetchNotificationsSaga() {
  yield takeLatest(
    NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_STATUS_START,
    fetchNotificationsByStatus
  );
}

export function* fetchNotificationsByDateSaga() {
  yield takeLatest(
    NotificationsActionTypes.FETCH_NOTIFICATIONS_BY_DATE_START,
    fetchNotificationsByDate
  );
}

export function* changeNotificationsStatusSaga() {
  yield takeLatest(
    NotificationsActionTypes.CHANGE_NOTIFICATIONS_STATUS_START,
    changeNotificationsStatus
  );
}

export function* notificationsSagas() {
  yield all([
    call(fetchNotificationsSaga),
    call(fetchNotificationsByDateSaga),
    call(changeNotificationsStatusSaga),
  ]);
}
