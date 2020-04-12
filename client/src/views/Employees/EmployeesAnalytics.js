import React, { useEffect, useContext } from "react";
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
import sumDocuments from "analytics/sumDocuments";
import SimpleCard from "components/SimpleCard/SimpleCard";
import determineUnitsOfTime from "analytics/determineUnitsOfTime";
import transformDataForSimpleLineChart from "../../analytics/transformDataForSimpleLineChart";
import SimpleLineChart from "../../components/SimpleLineChart/SimpleLineChart";
import { Typography } from "@material-ui/core";
import { UserContext } from "../../providers/UserProvider";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const EmployeesAnalytics = ({ employee, fetchTranscriptionsStart, data }) => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { uid: customerUID } = user;
  useEffect(() => {
    if (employee) {
      fetchTranscriptionsStart(customerUID, employee.uid);
    }
  }, [employee, customerUID, fetchTranscriptionsStart]);
  let audioLength = data ? sumDocuments(data, "audioLength").toFixed(2) : 0;
  const {
    units: unitsAudioLength,
    total: totalAudioLength
  } = determineUnitsOfTime(audioLength);
  const rows = data
    ? data.map(({ date, transcription }) => ({
        date: date.toDate().toLocaleDateString(),
        transcription
      }))
    : null;
  const audioLengthInTime = data
    ? transformDataForSimpleLineChart(data, "date", ["audioLength"])
    : null;
  return employee && data ? (
    <div>
      <Grid container item justify="center">
        Employee: {employee.name}
      </Grid>
      <Grid container>
        <Grid item>
          <SimpleCard
            title="Total audio length"
            content={totalAudioLength}
            units={unitsAudioLength}
          />
        </Grid>
      </Grid>
      <div style={{ height: "100px" }} />
      <Grid container>
        <Grid item>
          <SimpleCard title={"Audio length in time"}>
            <SimpleLineChart data={audioLengthInTime} />
          </SimpleCard>
        </Grid>
      </Grid>
      <div style={{ height: "100px" }} />
      <Grid container item justify="center">
        <Typography variant="h3">Latest transcriptions</Typography>
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
  ) : null;
};

const mapStateToProps = (state, ownProps) => ({
  employee: selecEmployeeById(ownProps.match.params.employeeUid)(state),
  data: state.transcriptions.data
});

const mapDispatchToProps = dispatch => ({
  fetchTranscriptionsStart: (customerUID, employeeUID) =>
    dispatch(fetchTranscriptionsStart(customerUID, employeeUID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesAnalytics);
