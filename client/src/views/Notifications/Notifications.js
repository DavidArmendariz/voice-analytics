import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectNotificationsAsTable } from "../../redux/notifications/notifications.selectors";
import CustomTable from "components/CustomTable/CustomTable";
import ExportButton from "components/ExportButton/ExportButton";
import Typography from "@material-ui/core/Typography";

const NotificationsList = ({ notifications }) => {
  return (
    notifications && (
      <Grid container spacing={5}>
        <Grid container item justify="center">
          <Typography variant="h4" gutterBottom>
            Filter your notifications by date
          </Typography>
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

export default connect(mapStateToProps)(NotificationsList);
