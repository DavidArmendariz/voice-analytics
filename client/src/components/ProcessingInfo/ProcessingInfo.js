import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ProcessingInfo = ({ data, options }) => {
  return (
    <React.Fragment>
      <Grid container item justify="center">
        <Typography variant="h3">{options.title}</Typography>
      </Grid>
      {Object.keys(options.subtitles).map((subtitle, index) => {
        return (
          <Grid key={index} container item justify="center">
            <span>
              <b>{options.subtitles[subtitle]}: </b> {data[subtitle]}{" "}
              {options.units[subtitle] ? options.units[subtitle] : ""}
            </span>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default ProcessingInfo;
