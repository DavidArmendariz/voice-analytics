import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { selecEmployeeById } from "../../redux/employees/employees.selectors";
import { fetchTranscriptionsStart } from "../../redux/transcriptions/transcriptions.actions";
import Grid from "@material-ui/core/Grid";
import sumDocuments from "analytics/sumDocuments";
import SimpleCard from "components/SimpleCard/SimpleCard";
import determineUnitsOfTime from "analytics/determineUnitsOfTime";
import transformDataForSimpleLineChart from "../../analytics/transformDataForSimpleLineChart";
import SimpleLineChart from "../../components/SimpleLineChart/SimpleLineChart";
import { Typography } from "@material-ui/core";
import { UserContext } from "providers/UserProvider";
import CustomTable from "components/CustomTable/CustomTable";
import StartEndDatePicker from "components/DatePicker/DatePicker";
import millisecondsPerDay from "constants/Milliseconds";
import extractKeywords from "utils/ExtractKeywords";
import WordCloud from "components/WordCloud/WordCloud";

const EmployeesAnalytics = ({ employee, fetchTranscriptionsStart, data }) => {
  const { uid: customerUID } = useContext(UserContext);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    new Date(endDate.getTime() - 7 * millisecondsPerDay)
  );
  useEffect(() => {
    if (customerUID && employee) {
      fetchTranscriptionsStart(customerUID, employee.uid);
    }
  }, [employee, customerUID, fetchTranscriptionsStart]);
  // Data for our graphs and tables
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
  const keywords = data ? extractKeywords(data) : null;
  return employee && data ? (
    <div>
      <Grid container item justify="center" style={{ height: "70px" }}>
        <Typography variant="h4" gutterBottom>
          Employee: {employee.name}
        </Typography>
      </Grid>
      <Grid container item justify="center" style={{ height: "70px" }}>
        <StartEndDatePicker
          startDate={startDate}
          endDate={endDate}
          handleStartDate={setStartDate}
          handleEndDate={setEndDate}
        />
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
      <div style={{ height: "40px" }} />
      <Grid container>
        <Grid item>
          <SimpleCard title={"Audio length in time"}>
            <SimpleLineChart data={audioLengthInTime} />
          </SimpleCard>
        </Grid>
      </Grid>
      <div style={{ height: "100px" }} />
      <Grid container>
        <Grid item>
          <SimpleCard title={"Top keywords"}>
            <WordCloud words={keywords} />
          </SimpleCard>
        </Grid>
      </Grid>
      <div style={{ height: "100px" }} />
      <Grid container></Grid>
      <Grid container item justify="center">
        <Typography variant="h4" gutterBottom>
          Latest transcriptions
        </Typography>
      </Grid>
      <CustomTable headers={["Date", "Transcription"]} rows={rows} />
    </div>
  ) : (
    <div>No data available for this employee.</div>
  );
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
