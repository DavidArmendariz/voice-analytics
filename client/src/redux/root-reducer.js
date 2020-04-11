import { combineReducers } from "redux";
import employeesReducer from "./employees/employees.reducer";
import transcriptionsReducer from "./transcriptions/transcriptions.reducer";

const rootReducer = combineReducers({
  employees: employeesReducer,
  transcriptions: transcriptionsReducer
});

export default rootReducer;
