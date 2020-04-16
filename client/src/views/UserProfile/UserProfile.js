/*eslint-disable*/
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import addEmployee from "utils/AddEmployee";
import CustomizedSnackbars from "components/CustomSnackbar/CustomSnackbar";

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

const UserProfile = () => {
  const classes = useStyles();
  const [name, setName] = useState("David");
  const [open, setOpen] = useState(false);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "name") {
      setName(value);
    }
  };
  const onCreateClick = (event) => {
    event.preventDefault();
    addEmployee(name, "MXCwUZ4B7fYqOezWTS1gGUWcjiW2").then((response) => {
      if (response) {
        setOpen(true);
      }
    });
  };
  return (
    <Grid container>
      <Grid container justify="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Add new employee
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <form className={classes.root} noValidate autoComplete="off">
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
            onClick={(event) => onCreateClick(event)}
          >
            Create
          </Button>
        </form>
      </Grid>
      <CustomizedSnackbars message={"error"} open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default UserProfile;
