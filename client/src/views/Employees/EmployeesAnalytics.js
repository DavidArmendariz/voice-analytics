import React from "react";
import { connect } from "react-redux";
import { selecEmployeeById } from "../../redux/employees/employees.selectors";
import { selectTranscriptions } from "../../redux/transcriptions/transcriptions.selectors";
import { fetchTranscriptionsStart } from "../../redux/transcriptions/transcriptions.actions";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "components/SimpleCard/SimpleCard";
import SimpleLineChart from "../../components/SimpleLineChart/SimpleLineChart";
import Typography from "@material-ui/core/Typography";
import CustomTable from "components/CustomTable/CustomTable";
import StartEndDatePicker from "components/StartEndDatePicker/StartEndDatePicker";
import WordCloud from "components/WordCloud/WordCloud";
import { handleStartDateChange, handleEndDateChange } from "utils/dateHandlers";
import determinateSentimentIcon from "analytics/determineSentimentIcon";
import ExportButton from "components/ExportButton/ExportButton";
import SimpleBarChart from "components/BarChart/BarChart";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import { today, lastWeek } from "constants/dates.constants";
import processAnalytics from "analytics/processAnalytics";
import Loader from "react-loader-spinner";

const EmployeesAnalytics = ({
  employee,
  fetchTranscriptionsStart,
  data,
  isFetching,
}) => {
  const [endDate, setEndDate] = React.useState(today);
  const [startDate, setStartDate] = React.useState(lastWeek);
  React.useEffect(() => {
    if (employee) {
      fetchTranscriptionsStart(employee.uid, startDate, endDate);
    }
  }, [employee, startDate, endDate, fetchTranscriptionsStart]);

  // Data for our graphs and tables
  const {
    audioLength,
    averageAudioLength,
    averageSentimentScore,
    rows,
    exportedRows,
    audioLengthInTime,
    averageAudioLenghtInTime,
    keywords,
    categories,
    frequencyCategories,
    frequencyKeywords,
  } = processAnalytics(data);

  return isFetching ? (
    <Grid container item justify="center">
      <Loader type="Oval" color="#6a0dad" />
    </Grid>
  ) : data.length ? (
    <React.Fragment>
      <Grid container item justify="center" style={{ height: "70px" }}>
        <Typography variant="h4" gutterBottom>
          Employee: {employee.name}
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
      <Grid container spacing={6}>
        <Grid item>
          <SimpleCard
            title="Total audio length"
            content={audioLength}
            units=""
          />
        </Grid>
        <Grid item>
          <SimpleCard
            title="Average audio length"
            content={averageAudioLength}
            units=""
          />
        </Grid>
        <Grid item>
          <SimpleCard title="Average sentiment score">
            <Grid container justify="center" spacing={4}>
              <Grid item>
                <Box
                  color="textSecondary"
                  fontSize={30}
                  fontWeight="fontWeightRegular"
                >
                  {averageSentimentScore}
                </Box>
              </Grid>
              <Grid item>
                <Tooltip title="+1 is extremely Positive, 0 is neutral and -1 is extremely negative">
                  {determinateSentimentIcon(averageSentimentScore)}
                </Tooltip>
              </Grid>
            </Grid>
          </SimpleCard>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item>
          <SimpleCard title="Audio length in time">
            <SimpleLineChart
              data={audioLengthInTime}
              options={{
                series: ["audioLength"],
                horizontalAxis: "date",
                seriesNames: { audioLength: "Audio length" },
                colors: { audioLength: "#000000" },
              }}
            />
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Average audio length in time">
            <SimpleLineChart
              data={averageAudioLenghtInTime}
              options={{
                series: ["audioLength"],
                horizontalAxis: "date",
                seriesNames: { audioLength: "Average audio length" },
                colors: { audioLength: "#000000" },
              }}
            />
          </SimpleCard>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item>
          <SimpleCard title="Top keywords">
            <WordCloud words={keywords} />
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Top categories">
            <WordCloud words={categories} />
          </SimpleCard>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item>
          <SimpleCard title="Frequency of top categories">
            <SimpleBarChart
              data={frequencyCategories}
              options={{
                color: "#82ca9d",
                name: "Frequency",
              }}
            />
          </SimpleCard>
        </Grid>
        <Grid item>
          <SimpleCard title="Frequency of top keywords">
            <SimpleBarChart
              data={frequencyKeywords}
              options={{
                color: "#82ca9d",
                name: "Frequency",
              }}
            />
          </SimpleCard>
        </Grid>
      </Grid>
      <div style={{ height: "100px" }} />
      <Grid container item justify="center">
        <Typography variant="h4" gutterBottom>
          Latest transcriptions
        </Typography>
      </Grid>
      <Grid container item justify="flex-end" style={{ height: "70px" }}>
        <ExportButton
          headers={[
            "Date",
            "Transcription",
            "Categories",
            "Keywords",
            "Sentiment",
          ]}
          data={exportedRows}
        />
      </Grid>
      <CustomTable
        headers={[
          "Date",
          "Transcription",
          "Categories",
          "Keywords",
          "Sentiment",
        ]}
        rows={rows}
      />
    </React.Fragment>
  ) : (
    <div>
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
      No data available.
    </div>
  );
};

const mapStateToProps = (store, ownProps) => ({
  employee: selecEmployeeById(ownProps.match.params.employeeUid)(store),
  data: selectTranscriptions(store),
  isFetching: store.transcriptions.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTranscriptionsStart: (employeeUID, startDate, endDate) =>
    dispatch(fetchTranscriptionsStart(employeeUID, startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesAnalytics);
