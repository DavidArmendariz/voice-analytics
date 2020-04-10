import { combineReducers } from "redux";
import employeesReducer from "./employees/employees.reducer";

const rootReducer = combineReducers({
  employees: employeesReducer
});

export default rootReducer;
