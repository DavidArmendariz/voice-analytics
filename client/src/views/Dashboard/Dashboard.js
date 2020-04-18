import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Options from "../../components/Select/Select";
import { languages } from "../../constants/Languages";
import arrayToObject from "../../utils/ArrayToObject";
import processAudio from "../../utils/processAudio";
import Loader from "react-loader-spinner";
import { UserContext } from "../../providers/UserProvider";
import ProcessingInfo from "components/ProcessingInfo/ProcessingInfo";

const Dashboard = ({ employees }) => {
  const [file, setFile] = React.useState(null);
  const [transcription, setTranscription] = React.useState(null);
  const [employeeUID, setEmployeeUID] = React.useState(null);
  const [languageCode, setLanguageCode] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [metadata, setMetadata] = React.useState(null);
  const { uid: customerUID } = React.useContext(UserContext);

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadAndProcess = () => {
    const formData = new FormData();
    formData.append("file", file);
    setIsProcessing(true);
    processAudio(customerUID, employeeUID, languageCode, formData)
      .then((response) => {
        if (response) {
          setTranscription(response.transcription);
          setMetadata({
            audioLength: response.audioLength,
            sampleRate: response.sampleRate,
            categories: Object.keys(response.categories).join(", "),
            keywords: Object.keys(response.keywords).join(", "),
            sentiment: response.sentiment.documentSentimentScore,
          });
        } else {
          setTranscription("Oops, there was an error, try again later!");
        }
      })
      .then(() => setIsProcessing(false));
  };

  return employees ? (
    <React.Fragment>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src="/transcription.png"
            alt="transcription"
          />
        </Grid>
        <Grid container item xs={10}>
          Speech-to-text the calls of your agents to extract meaningful metrics
          that can improve your business operations.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src="/conversation.png"
            alt="conversation"
          />
        </Grid>
        <Grid container item xs={10}>
          Analyze conversation metrics like overtalk, talk style, tone, volume,
          confidence and sentiment.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src="/keywords.png"
            alt="keywords"
          />
        </Grid>
        <Grid container item xs={10}>
          Discover keywords and topics in your calls using semantic indexing.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src="/spot.png"
            alt="spot"
          />
        </Grid>
        <Grid container item xs={10}>
          Spot keywords and phrases important to your business brand.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src="/predict.png"
            alt="predict"
          />
        </Grid>
        <Grid container item xs={10}>
          Predict leads and prospects, customer churn, detect appointments,
          estimates and orders.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src="/swear.png"
            alt="swear"
          />
        </Grid>
        <Grid container item xs={10}>
          Spot swear words that can affect your business brand potentially.
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <Typography variant="h2">Try it now</Typography>
        </Grid>
      </Grid>
      <div style={{ height: "70px" }} />
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <Options
            title={"Select employee"}
            options={arrayToObject(employees, "name", "uid")}
            handleChange={setEmployeeUID}
          />
        </Grid>
      </Grid>
      <div style={{ height: "70px" }} />
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <Options
            title={"Select language"}
            options={languages}
            handleChange={setLanguageCode}
          />
        </Grid>
      </Grid>
      <div style={{ height: "70px" }} />
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <input type="file" name="file" onChange={handleUpload} />
        </Grid>
      </Grid>
      <div style={{ height: "70px" }} />
      <Grid container justify="center">
        {isProcessing ? (
          <Loader />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={uploadAndProcess}
          >
            Process
          </Button>
        )}
      </Grid>
      <div style={{ height: "70px" }} />
      {metadata ? (
        <Grid container justify="center">
          <ProcessingInfo
            data={metadata}
            options={{
              title: "Interesting facts about your audio",
              subtitles: {
                audioLength: "Audio length",
                sampleRate: "Sample rate",
                categories: "Categories",
                keywords: "Keywords",
              },
              units: {
                audioLength: "seconds",
                sampleRate: "hertz",
              },
            }}
          />
        </Grid>
      ) : null}
      <div style={{ height: "70px" }} />
      {transcription ? (
        <Grid container justify="center">
          <Grid container justify="center">
            <Typography variant="h2">Your transcription</Typography>
          </Grid>
          <div style={{ height: "70px" }}>{transcription}</div>
        </Grid>
      ) : null}
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (store) => ({
  employees: store.employees.employees,
});

export default connect(mapStateToProps)(Dashboard);
