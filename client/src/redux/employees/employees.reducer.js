import EmployeesActionTypes from './employees.types';

const INITIAL_STATE = {
  employees: null,
  isFetching: false,
  errorMessage: undefined
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EmployeesActionTypes.FETCH_EMPLOYEES_START:
      return {
        ...state,
        isFetching: true
      };
    case EmployeesActionTypes.FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employees: action.payload
      };

    case EmployeesActionTypes.FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default employeesReducer;
