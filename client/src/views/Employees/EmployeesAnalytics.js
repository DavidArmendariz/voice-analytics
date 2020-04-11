import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { selecEmployeeById } from "../../redux/employees/employees.selectors";
import { fetchTranscriptionsStart } from "../../redux/transcriptions/transcriptions.actions";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const EmployeesAnalytics = ({
  employee,
  fetchTranscriptionsStart,
  transcriptions
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (employee) {
      fetchTranscriptionsStart(employee.uid);
    }
  }, [employee, fetchTranscriptionsStart]);
  const rows = transcriptions ? transcriptions.map(({date, transcription}) => ({date: date.toDate().toLocaleDateString(), transcription})) : null;
  return (
    employee &&
    rows && (
      <div>
        <Grid container item justify="center">
          Employee: {employee.name}
        </Grid>
        <Grid container item justify="center">
          Latest transcriptions
        </Grid>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Transcription</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.transcription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
};

const mapStateToProps = (state, ownProps) => ({
  employee: selecEmployeeById(ownProps.match.params.employeeUid)(state),
  transcriptions: state.transcriptions.transcriptions
});

const mapDispatchToProps = dispatch => ({
  fetchTranscriptionsStart: uid => dispatch(fetchTranscriptionsStart(uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesAnalytics);
