import { takeLatest, call, put, all } from "redux-saga/effects";
import AnalyticsDataActionTypes from "./analyticsdata.types";
import {
  fetchAnalyticsDataSuccess,
  fetchAnalyticsDataFailure,
} from "./analyticsdata.actions";
import { firestore, getUID } from "../../firebase/firebase.utils";

export function* fetchAnalyticsData({ customerUID, startDate, endDate }) {
  try {
    const employeesReference = firestore
      .collection("customers")
      .doc(customerUID)
      .collection("employees");
    const employeesUIDreference = yield employeesReference.get();
    const employeesUID = yield call(getUID, employeesUIDreference);
    const populate = yield all(
      employeesUID.map((employeeUID) => {
        return firestore
          .collection("customers")
          .doc(customerUID)
          .collection("employees")
          .doc(employeeUID)
          .collection("transcriptions")
          .where("date", ">=", startDate)
          .where("date", "<=", endDate)
          .get()
          .then((response) => {
            const dataFromEmployee = [];
            if (response.docs.length) {
              response.docs.map((doc) => dataFromEmployee.push(doc.data()));
            }
            return dataFromEmployee;
          });
      })
    );
    const data = populate.flat();
    yield put(fetchAnalyticsDataSuccess(data));
  } catch (error) {
    console.log(`Error in fetchAnalyticsData: ${error}`);
    yield put(fetchAnalyticsDataFailure(error.message));
  }
}

export function* fetchAnalyticsDataSaga() {
  yield takeLatest(
    AnalyticsDataActionTypes.FETCH_ANALYTICSDATA_START,
    fetchAnalyticsData
  );
}

export function* analyticsDataSagas() {
  yield all([call(fetchAnalyticsDataSaga)]);
}
