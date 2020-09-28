import SnackbarActionTypes from "./snackbarstatus.types";

const INITIAL_STATE = {
  message: "",
  severity: "",
  snackbarStatus: false,
};

const snackbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SnackbarActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarStatus: false,
      };
    case SnackbarActionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        snackbarStatus: true,
        message: action.message,
        severity: action.severity,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
