/*eslint-disable*/
import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "providers/UserProvider";
import { fetchAnalyticsDataStart } from "redux/analyticsdata/analyticsdata.actions";
import { handleStartDateChange, handleEndDateChange } from "utils/dateHandlers";
import StartEndDatePicker from "components/StartEndDatePicker/StartEndDatePicker";
import convertDataForBars from "analytics/convertDataForBars";
import SimpleBarChart from "components/BarChart/BarChart";
import Box from "@material-ui/core/Box";
import sumDocuments from "analytics/sumDocuments";
import SimpleCard from "components/SimpleCard/SimpleCard";
import determineUnitsOfTime from "analytics/determineUnitsOfTime";
import convertDataForLine from "../../analytics/convertDataForLine";
import SimpleLineChart from "../../components/SimpleLineChart/SimpleLineChart";
import determinateSentimentIcon from "analytics/determineSentimentIcon";
import convertDataForWordCloud from "analytics/convertDataForWordCloud";
import WordCloud from "components/WordCloud/WordCloud";
import ExportButton from "components/ExportButton/ExportButton";
import CustomTable from "components/CustomTable/CustomTable";
import Tooltip from "@material-ui/core/Tooltip";
import { today, lastWeek } from "constants/dates.constants";

const MAX_ELEMENTS_IN_BARS = 10;

const Analytics = ({ analyticsData: data, fetchAnalyticsDataStart }) => {
  const { uid: customerUID } = React.useContext(UserContext);
  const [endDate, setEndDate] = React.useState(today);
  const [startDate, setStartDate] = React.useState(lastWeek);

  React.useEffect(() => {
    if (customerUID) {
      fetchAnalyticsDataStart(customerUID, startDate, endDate);
    }
  }, [customerUID, startDate, endDate, fetchAnalyticsDataStart]);

  // Data transformations (this is duplicated code, please refactor)
  const audioLength =
    data.length && determineUnitsOfTime(sumDocuments(data, "audioLength"));
  const averageAudioLength =
    data.length &&
    determineUnitsOfTime(sumDocuments(data, "audioLength", true));
  const averageSentimentScore =
    data.length &&
    sumDocuments(
      data.map((doc) => doc["sentiment"]),
      "documentSentimentScore",
      true
    );
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
    data.length && convertDataForLine(data, "date", ["audioLength"]);
  const averageAudioLenghtInTime =
    data.length && convertDataForLine(data, "date", ["audioLength"], true);
  const keywords = data.length && convertDataForWordCloud(data, "keywords");
  const categories = data.length && convertDataForWordCloud(data, "categories");
  const frequencyCategories =
    data.length && convertDataForBars(data, "categories", MAX_ELEMENTS_IN_BARS);
  const frequencyKeywords = convertDataForBars(
    data,
    "keywords",
    MAX_ELEMENTS_IN_BARS
  );

  return data.length ? (
    <React.Fragment>
      <Grid container justify="center">
        <Typography variant="h2">Analytics</Typography>
      </Grid>
      <Grid container justify="center" style={{ height: "70px" }}>
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
