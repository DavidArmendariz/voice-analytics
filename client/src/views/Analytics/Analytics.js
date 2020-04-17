/*eslint-disable*/
import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "providers/UserProvider";
import { fetchAnalyticsDataStart } from "redux/analyticsdata/analyticsdata.actions";
import { handleStartDateChange, handleEndDateChange } from "utils/dateHandlers";
import { millisecondsPerDay } from "constants/math.constants";
import StartEndDatePicker from "components/StartEndDatePicker/StartEndDatePicker";

const today = new Date();
today.setHours(23, 59, 59);
const lastWeek = new Date(today.getTime() - 7 * millisecondsPerDay);
lastWeek.setHours(0, 0, 0);

const Analytics = ({ analyticsData, fetchAnalyticsDataStart }) => {
  const { uid: customerUID } = React.useContext(UserContext);
  const [endDate, setEndDate] = React.useState(today);
  const [startDate, setStartDate] = React.useState(lastWeek);

  React.useEffect(() => {
    if (customerUID) {
      fetchAnalyticsDataStart(customerUID, startDate, endDate);
    }
  }, [customerUID, startDate, endDate, fetchAnalyticsDataStart]);
  console.log(analyticsData);
  return analyticsData ? (
    <React.Fragment>
      <Grid container justify="center">
        <Typography variant="h2">Analytics</Typography>
      </Grid>
      <Grid container justify="center">
        <Typography variant="h6">
          In this page, you'll find stats about the company as a whole
        </Typography>
      </Grid>
      <Grid container item justify="center" style={{ height: "70px" }}>
        <StartEndDatePicker
          startDate={startDate}
          endDate={endDate}
          handleStartDate={(date) =>
            handleStartDateChange(date, endDate, setStartDate)
          }
          handleEndDate={(date) =>
            handleEndDateChange(date, startDate, setEndDate)
          }
        />
      </Grid>
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (store) => ({
  analyticsData: store.analytics.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAnalyticsDataStart: (customerUID, startDate, endDate) =>
    dispatch(fetchAnalyticsDataStart(customerUID, startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
