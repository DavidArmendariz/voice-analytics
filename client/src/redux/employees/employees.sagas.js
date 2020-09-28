import { takeLatest, call, put, all } from "redux-saga/effects";
import EmployeesActionTypes from "./employees.types";
import {
  firestore,
  getDocumentsFromSnapshot,
  auth
} from "../../firebase/firebase.utils";
import {
  fetchEmployeesSuccess,
  fetchEmployeesFailure
} from "./employees.actions";

export function* fetchEmployees() {
  try {
    const customerUID = yield auth.currentUser.uid;
    const employeesReference = firestore
      .collection("customers")
      .doc(customerUID)
      .collection("employees");
    const snapshot = yield employeesReference.get();
    const employees = yield call(getDocumentsFromSnapshot, snapshot);
    yield put(fetchEmployeesSuccess(employees));
  } catch (error) {
    console.log(`Error in fetchEmployees: ${error}`);
    yield put(fetchEmployeesFailure(error.message));
  }
}

export function* fetchEmployeesSaga() {
  yield takeLatest(EmployeesActionTypes.FETCH_EMPLOYEES_START, fetchEmployees);
}

export function* employeesSagas() {
  yield all([call(fetchEmployeesSaga)]);
}
