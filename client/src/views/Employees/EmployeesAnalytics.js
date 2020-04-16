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
import { millisecondsPerDay } from "constants/math.constants";
import convertDataForWordCloud from "analytics/convertDataForWordCloud";
import WordCloud from "components/WordCloud/WordCloud";
import { handleStartDateChange, handleEndDateChange } from "utils/dateHandlers";
import determinateSentimentIcon from "analytics/determineSentimentIcon";
import ExportButton from "components/ExportButton/ExportButton";

const today = new Date();
today.setHours(23, 59, 59);
const lastWeek = new Date(today.getTime() - 7 * millisecondsPerDay);
lastWeek.setHours(0, 0, 0);

const EmployeesAnalytics = ({ employee, fetchTranscriptionsStart, data }) => {
  const { uid: customerUID } = useContext(UserContext);
  const [endDate, setEndDate] = useState(today);
  const [startDate, setStartDate] = useState(lastWeek);
  useEffect(() => {
    if (customerUID && employee) {
      fetchTranscriptionsStart(customerUID, employee.uid, startDate, endDate);
    }
  }, [employee, customerUID, startDate, endDate, fetchTranscriptionsStart]);

  // Data for our graphs and tables
  console.log(data);
  const audioLength =
    data.length && determineUnitsOfTime(sumDocuments(data, "audioLength"));
  const averageAudioLength =
    data.length &&
    determineUnitsOfTime(sumDocuments(data, "audioLength", true));
  const rows =
    data.length &&
    data.map(({ date, transcription, categories, keywords, sentiment }) => ({
      date: date.toDate().toLocaleDateString(),
      transcription,
      categories: Object.keys(categories).join(", "),
      keywords: Object.keys(keywords).join(", "),
      sentiment: determinateSentimentIcon(sentiment.documentSentimentScore),
    }));
  const exportedRows =
    data.length &&
    data.map(({ date, transcription, categories, keywords, sentiment }) => {
      return [
        date.toDate().toLocaleDateString(),
        transcription,
        Object.keys(categories).join(", "),
        Object.keys(keywords).join(", "),
        sentiment.documentSentimentScore,
      ];
    });
  const audioLengthInTime =
    data.length &&
    transformDataForSimpleLineChart(data, "date", ["audioLength"]);
  const averageAudioLenghtInTime =
    data.length &&
    transformDataForSimpleLineChart(data, "date", ["audioLength"], true);
  const keywords = data.length && convertDataForWordCloud(data, "keywords");
  const categories = data.length && convertDataForWordCloud(data, "categories");

  return employee && data.length ? (
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
      No data available for this employee.
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  employee: selecEmployeeById(ownProps.match.params.employeeUid)(state),
  data: state.transcriptions.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTranscriptionsStart: (customerUID, employeeUID, startDate, endDate) =>
    dispatch(
      fetchTranscriptionsStart(customerUID, employeeUID, startDate, endDate)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesAnalytics);
