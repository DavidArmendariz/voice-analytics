import EmployeesActionTypes from "./employees.types";

export const fetchEmployeesStart = () => ({
  type: EmployeesActionTypes.FETCH_EMPLOYEES_START,
});

export const fetchEmployeesSuccess = employees => ({
  type: EmployeesActionTypes.FETCH_EMPLOYEES_SUCCESS,
  payload: employees
});

export const fetchEmployeesFailure = errorMessage => ({
  type: EmployeesActionTypes.FETCH_EMPLOYEES_FAILURE,
  payload: errorMessage
});