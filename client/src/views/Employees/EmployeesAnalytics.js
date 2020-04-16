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
import StartEndDatePicker from "components/StartEndDatePicker/StartEndDatePicker";
import millisecondsPerDay from "constants/Milliseconds";
import convertDataForWordCloud from "utils/ConvertDataForWordCloud";
import WordCloud from "components/WordCloud/WordCloud";

const EmployeesAnalytics = ({ employee, fetchTranscriptionsStart, data }) => {
  const { uid: customerUID } = useContext(UserContext);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(
    new Date(endDate.getTime() - 7 * millisecondsPerDay)
  );
  useEffect(() => {
    if (customerUID && employee) {
      fetchTranscriptionsStart(customerUID, employee.uid, startDate, endDate);
    }
  }, [employee, customerUID, startDate, endDate, fetchTranscriptionsStart]);

  const handleStartDateChange = date => {
    if (date > endDate) {
      alert("Start date cannot be greater than end date");
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = date => {
    if (date < startDate) {
      alert("End date cannot be less than end date");
    } else {
      setEndDate(date);
    }
  };

  // Data for our graphs and tables
  const audioLength = data.length
    ? sumDocuments(data, "audioLength").toFixed(2)
    : 0;
  const averageAudioLength = data.length ? sumDocuments(data, "audioLength", true).toFixed(2) : 0;
  const {
    units: unitsAudioLength,
    total: totalAudioLength
  } = determineUnitsOfTime(audioLength);
  const rows = data.length
    ? data.map(({ date, transcription, categories, keywords }) => ({
      date: date.toDate().toLocaleDateString(),
      transcription,
      categories: Object.keys(categories).join(", "),
      keywords: Object.keys(keywords).join(", ")
    }))
    : null;
  const audioLengthInTime = data.length
    ? transformDataForSimpleLineChart(data, "date", ["audioLength"])
    : null;
  const keywords = data.length ? convertDataForWordCloud(data, "keywords") : null;
  const categories = data.length ? convertDataForWordCloud(data, "categories") : null;

  return employee && data.length ? (
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
          handleStartDate={handleStartDateChange}
          handleEndDate={handleEndDateChange}
        />
      </Grid>
      <Grid container spacing={6}>
        <Grid item>
          <SimpleCard
            title="Total audio length"
            content={totalAudioLength}
            units={unitsAudioLength}
          />
        </Grid>
        <Grid item>
          <SimpleCard
            title="Average audio length"
            content={averageAudioLength}
            units={unitsAudioLength}
          />
        </Grid>
      </Grid>
      <div style={{ height: "40px" }} />
      <Grid container>
        <Grid item>
          <SimpleCard title={"Audio length in time"}>
            <SimpleLineChart
              data={audioLengthInTime}
              options={{
                series: ["audioLength"],
                horizontalAxis: "date",
                seriesNames: { audioLength: "Audio Length" },
                colors: { audioLength: "#000000" }
              }} />
          </SimpleCard>
        </Grid>
      </Grid>
      <div style={{ height: "100px" }} />
      <Grid container spacing={6}>
        <Grid item>
          <SimpleCard title={"Top keywords"}>
            <WordCloud words={keywords} />
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title={"Top categories"}>
            <WordCloud words={categories} />
          </SimpleCard>
        </Grid>
      </Grid>
      <div style={{ height: "100px" }} />
      <Grid container item justify="center">
        <Typography variant="h4" gutterBottom>
          Latest transcriptions
        </Typography>
      </Grid>
      <CustomTable headers={["Date", "Transcription", "Categories", "Keywords"]} rows={rows} />
    </div>
  ) : (
      <div>
        <Grid container item justify="center" style={{ height: "70px" }}>
          <StartEndDatePicker
            startDate={startDate}
            endDate={endDate}
            handleStartDate={handleStartDateChange}
            handleEndDate={handleEndDateChange}
          />
        </Grid>
      No data available for this employee.
      </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
  employee: selecEmployeeById(ownProps.match.params.employeeUid)(state),
  data: state.transcriptions.data
});

const mapDispatchToProps = dispatch => ({
  fetchTranscriptionsStart: (customerUID, employeeUID, startDate, endDate) =>
    dispatch(
      fetchTranscriptionsStart(customerUID, employeeUID, startDate, endDate)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesAnalytics);
