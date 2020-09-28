import SnackbarActionTypes from "./snackbarstatus.types";

export const closeSnackbar = () => ({
  type: SnackbarActionTypes.CLOSE_SNACKBAR,
});

export const openSnackbar = (message, severity) => ({
  type: SnackbarActionTypes.OPEN_SNACKBAR,
  message,
  severity,
});
