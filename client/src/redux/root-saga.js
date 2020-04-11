import { all, call } from "redux-saga/effects";
import { employeesSagas } from "./employees/employees.sagas";
import { transcriptionsSagas } from "./transcriptions/transcriptions.sagas";

export default function* rootSaga() {
  yield all([call(employeesSagas), call(transcriptionsSagas)]);
}
