import { takeLatest, call, put, all } from "redux-saga/effects";
import TranscriptionsActionsTypes from "./transcriptions.types";
import {
  fetchTranscriptionsSuccess,
  fetchTranscriptionsFailure
} from "./transcriptions.actions";
import {
  firestore,
  getDocumentsFromSnapshot
} from "../../firebase/firebase.utils";

export function* fetchTranscriptions({ uid }) {
  try {
    const employeeReference = firestore
      .collection("employees")
      .doc(uid)
      .collection("transcriptions");
    const snapshot = yield employeeReference.get();
    const transcriptions = yield call(getDocumentsFromSnapshot, snapshot);
    yield put(fetchTranscriptionsSuccess(transcriptions));
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
