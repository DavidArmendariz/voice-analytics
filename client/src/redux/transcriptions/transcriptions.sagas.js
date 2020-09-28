import { takeLatest, call, put, all } from "redux-saga/effects";
import TranscriptionsActionsTypes from "./transcriptions.types";
import {
  fetchTranscriptionsSuccess,
  fetchTranscriptionsFailure
} from "./transcriptions.actions";
import {
  firestore,
  getDocumentsFromSnapshot,
  auth
} from "../../firebase/firebase.utils";

export function* fetchTranscriptions({
  employeeUID,
  startDate,
  endDate
}) {
  try {
    const customerUID = yield auth.currentUser.uid;
    const employeeReference = firestore
      .collection("customers")
      .doc(customerUID)
      .collection("employees")
      .doc(employeeUID)
      .collection("transcriptions")
      .where("date", ">=", startDate)
      .where("date", "<=", endDate);
    const snapshot = yield employeeReference.get();
    const data = yield call(getDocumentsFromSnapshot, snapshot);
    yield put(fetchTranscriptionsSuccess(data));
  } catch (error) {
    console.log(`Error in fetchTranscriptions: ${error}`);
    yield put(fetchTranscriptionsFailure(error.message));
  }
}

export function* fetchTranscriptionsSaga() {
  yield takeLatest(
    TranscriptionsActionsTypes.FETCH_TRANSCRIPTIONS_START,
    fetchTranscriptions
  );
}

export function* transcriptionsSagas() {
  yield all([call(fetchTranscriptionsSaga)]);
}
