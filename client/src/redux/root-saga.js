import { all, call } from "redux-saga/effects";
import { employeesSagas } from "./employees/employees.sagas";
import { transcriptionsSagas } from "./transcriptions/transcriptions.sagas";
import { analyticsDataSagas } from "./analyticsdata/analyticsdata.sagas";
import { notificationsSagas } from "./notifications/notifications.sagas";
import { metadataSagas } from "./customermetadata/customermetada.sagas";

export default function* rootSaga() {
  yield all([
    call(employeesSagas),
    call(transcriptionsSagas),
    call(analyticsDataSagas),
    call(notificationsSagas),
    call(metadataSagas),
  ]);
}
