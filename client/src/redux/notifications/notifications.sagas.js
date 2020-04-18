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
} from "./notifications.actions";

export function* fetchNotifications() {
  try {
    const customerUID = yield auth.currentUser.uid;
    const notificationsReference = firestore
      .collection("customers")
      .doc(customerUID)
      .collection("notifications");
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

export function* fetchNotificationsSaga() {
  yield takeLatest(NotificationsActionTypes.FETCH_NOTIFICATIONS_START, fetchNotifications);
}

export function* notificationsSagas() {
  yield all([call(fetchNotificationsSaga)]);
}
