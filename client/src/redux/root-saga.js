import { all, call } from "redux-saga/effects";
import { employeesSagas } from "./employees/employees.sagas";

export default function* rootSaga() {
  yield all([call(employeesSagas)]);
}
