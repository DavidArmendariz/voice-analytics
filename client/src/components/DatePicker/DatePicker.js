import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const StartEndDatePicker = ({
  startDate,
  endDate,
  handleStartDate,
  handleEndDate
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={handleStartDate}
      />
      <DatePicker
        autoOk
        label="End Date"
        disableFuture
        value={endDate}
        onChange={handleEndDate}
      />
    </MuiPickersUtilsProvider>
  );
};

export default StartEndDatePicker;
