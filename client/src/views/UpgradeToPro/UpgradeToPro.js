/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  return (
    <div>
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <Typography variant="h2" gutterBottom>
            We can analyze every kind of text too!
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Your text goes here"
            rowsMin={10}
            style={{ width: "1000px" }}
          />
        </form>
      </Grid>
    </div>
  );
}
