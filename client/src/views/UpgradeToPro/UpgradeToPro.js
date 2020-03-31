/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src={"/youtube.png"}
          />
        </Grid>
        <Grid container item xs={10}>
          Video content creator? Generate subtitles or closed captions for your
          video project.
        </Grid>
      </Grid>
    </div>
  );
}
