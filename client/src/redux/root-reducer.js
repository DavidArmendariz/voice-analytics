import { combineReducers } from "redux";
import employeesReducer from "./employees/employees.reducer";
import transcriptionsReducer from "./transcriptions/transcriptions.reducer";
import analyticsDataReducer from "./analyticsdata/analyticsdata.reducer";

const rootReducer = combineReducers({
  employees: employeesReducer,
  transcriptions: transcriptionsReducer,
  analytics: analyticsDataReducer,
});

export default rootReducer;
