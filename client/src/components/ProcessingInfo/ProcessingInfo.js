import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const ProcessingInfo = ({ data, options }) => {
  return (
    <React.Fragment>
      <Grid container item justify="center">
        <Typography variant="h3">{options.title}</Typography>
      </Grid>
      {Object.keys(options.subtitles).map((subtitle, index) => {
        return (
          <Grid key={index} container item justify="center">
            <Box fontWeight="fontWeightBold">
              {options.subtitles[subtitle]}:
            </Box>{" "}
            {data[subtitle]}{" "}
            {options.units[subtitle] ? options.units[subtitle] : ""}
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default ProcessingInfo;
