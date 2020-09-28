import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { closeSnackbar } from "../../redux/snackbarstatus/snackbarstatus.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CustomizedSnackbars = ({ message, open, closeSnackbar, severity }) => {
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (store) => ({
  open: store.snackbarStatus.snackbarStatus,
  message: store.snackbarStatus.message,
  severity: store.snackbarStatus.severity,
});

const mapDispatchToProps = (dispatch) => ({
  closeSnackbar: () => dispatch(closeSnackbar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizedSnackbars);
