import { combineReducers } from "redux";
import employeesReducer from "./employees/employees.reducer";
import transcriptionsReducer from "./transcriptions/transcriptions.reducer";
import analyticsDataReducer from "./analyticsdata/analyticsdata.reducer";
import notificationsReducer from "./notifications/notifications.reducer";
import snackbarReducer from "./snackbarstatus/snackbarstatus.reducer";
import customerMetadataReducer from "./customermetadata/customermetadata.reducer";

const rootReducer = combineReducers({
  employees: employeesReducer,
  transcriptions: transcriptionsReducer,
  analytics: analyticsDataReducer,
  notifications: notificationsReducer,
  snackbarStatus: snackbarReducer,
  customerMetadata: customerMetadataReducer,
});

export default rootReducer;
