import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectNotificationsAsTable } from "../../redux/notifications/notifications.selectors";
import CustomTable from "components/CustomTable/CustomTable";
import ExportButton from "components/ExportButton/ExportButton";
import Typography from "@material-ui/core/Typography";
import { fetchNotificationsByDateStart } from "../../redux/notifications/notifications.actions";
import { handleStartDateChange, handleEndDateChange } from "utils/dateHandlers";
import StartEndDatePicker from "components/StartEndDatePicker/StartEndDatePicker";
import { today, lastWeek } from "constants/dates.constants";

const NotificationsList = ({
  notifications,
  fetchNotificationsByDateStart,
}) => {
  const [startDate, setStartDate] = React.useState(lastWeek);
  const [endDate, setEndDate] = React.useState(today);
  React.useEffect(() => {
    fetchNotificationsByDateStart(startDate, endDate);
  }, [fetchNotificationsByDateStart, startDate, endDate]);
  return (
    notifications && (
      <Grid container spacing={5}>
        <Grid container item justify="center">
          <Typography variant="h4" gutterBottom>
            Filter your notifications by date
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
        <Grid container item justify="flex-end">
          <ExportButton
            headers={["Date", "Message"]}
            data={notifications.map((notification) =>
              Object.values(notification)
            )}
            filename="notifications"
          />
        </Grid>
        <Grid container item justify="center">
          <CustomTable headers={["Date", "Message"]} rows={notifications} />
        </Grid>
      </Grid>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  notifications: selectNotificationsAsTable,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotificationsByDateStart: (startDate, endDate) =>
    dispatch(fetchNotificationsByDateStart(startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
