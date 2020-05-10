/*eslint-disable*/
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { openSnackbar } from "../../redux/snackbarstatus/snackbarstatus.actions";
import { UserContext } from "../../providers/UserProvider";
import axios from "axios";
import { connect } from "react-redux";
import Options from "../../components/Select/Select";
import arrayToObject from "utils/arrayToObject";
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserProfile = ({ employees, openSnackbar }) => {
  const classes = useStyles();
  const [name, setName] = React.useState("David");
  const { uid: customerUID } = React.useContext(UserContext);
  const [employeeUID, setEmployeeUID] = React.useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "name") {
      setName(value);
    }
  };
  const onCreateClick = async (event) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line
      let storeEmployee = await axios({
        url: `http://0.0.0.0:8080/store_employee`,
        method: "POST",
        data: {
          reference: `customers/${customerUID}/employees`,
          name,
        },
        headers: {
          Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
        },
      });
      openSnackbar("Employee added successfully", "success");
    } catch (error) {
      openSnackbar("Something went wrong", "error");
    }
  };

  const onDeleteClick = async (event) => {
    event.preventDefault();
    try {
      // eslint-disable-next-line
      let storeEmployee = await axios({
        url: `http://0.0.0.0:8080/delete_employee`,
        method: "POST",
        data: {
          reference: `customers/${customerUID}/employees/${employeeUID}/transcriptions`,
          name,
        },
        headers: {
          Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
        },
      });
      openSnackbar("Employee deleted successfully", "success");
    } catch (error) {
      openSnackbar("Something went wrong", "error");
    }
  };

  return employees ? (
    <Grid container>
      <Grid container justify="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Add new employee
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={onCreateClick}
        >
          <TextField
            required
            name="name"
            id="name"
            label="Name"
            defaultValue={name}
            onChange={(event) => onChangeHandler(event)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </Grid>
      <Grid container justify="center">
        <Typography variant="h3" gutterBottom>
          Delete employee
        </Typography>
      </Grid>
      <Grid container justify="center">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={onDeleteClick}
        >
          <Options
            title={"Select employee"}
            options={arrayToObject(employees, "name", "uid")}
            handleChange={setEmployeeUID}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Delete
          </Button>
        </form>
      </Grid>
      <Grid container item justify="center">
        <Typography variant="h3">Spot these keywords...</Typography>
      </Grid>
      <Grid container item justify="center">
        <ChipInput
          defaultValue={["promotion", "plans"]}
          onChange={(chips) => console.log(chips)}
        />
      </Grid>
    </Grid>
  ) : null;
};

const mapStateToProps = (store) => ({
  employees: store.employees.employees,
});

const mapDispatchToProps = (dispatch) => ({
  openSnackbar: (message, severity) =>
    dispatch(openSnackbar(message, severity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
