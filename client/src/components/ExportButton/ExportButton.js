import React from "react";
import { CSVLink } from "react-csv";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ExportButton = ({ headers, data }) => {
  const classes = useStyles();
  const exportedData = [headers, ...data];
  return (
    <div className={classes.root}>
      <CSVLink data={exportedData} filename={`transcriptions-${moment().format("YYYY-MM-DD")}.csv`}>
        <Button variant="contained" color="primary">
          Download
        </Button>
      </CSVLink>
    </div>
  );
};

export default ExportButton;
