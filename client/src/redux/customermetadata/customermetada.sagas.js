import { takeLatest, call, put, all } from "redux-saga/effects";
import CustomerMetadataActionTypes from "./customermetadata.types";
import {
  firestore,
  getDataFromDocument,
  auth,
} from "../../firebase/firebase.utils";
import {
  fetchMetadataSuccess,
  fetchMetadataFailure,
} from "./customermetadata.actions";

export function* fetchMetadata() {
  try {
    const customerUID = yield auth.currentUser.uid;
    const customerReference = firestore
      .collection("customers")
      .doc(customerUID);
    const snapshot = yield customerReference.get();
    const metadata = yield call(getDataFromDocument, snapshot);
    yield put(fetchMetadataSuccess({ uid: customerUID, ...metadata }));
  } catch (error) {
    console.log(`Error in fetchMetadata: ${error}`);
    yield put(fetchMetadataFailure(error.message));
  }
}

export function* fetchMetadataSaga() {
  yield takeLatest(
    CustomerMetadataActionTypes.FETCH_CUSTOMER_METADATA_START,
    fetchMetadata
  );
}

export function* metadataSagas() {
  yield all([call(fetchMetadataSaga)]);
}
