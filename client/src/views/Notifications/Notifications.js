import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectNotificationsAsTable } from "../../redux/notifications/notifications.selectors";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const NotificationsList = ({ notifications, match }) => {
  const classes = useStyles();

  return (
    notifications && (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Notification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date.toLocaleString()}</TableCell>
                <TableCell>{row.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  notifications: selectNotificationsAsTable,
});

export default connect(mapStateToProps)(NotificationsList);
