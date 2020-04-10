/*eslint-disable*/
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const useStyles = makeStyles(styles);

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Dashboard() {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const onChangeHandler = event => {
    setFile(event.target.files[0]);
  };

  const submitForm = (contentType, data) => {
    axios({
      url:
        "http://0.0.0.0:8080/upload?bucket=voice-8ddf6.appspot.com&blob=thisiscool.mp3",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": contentType,
        Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68"
      }
    })
      .then(response => {
        setTranscription(response.data);
      })
      .catch(error => {
        setTranscription("Oops! There was an error. Try again.");
      });
  };

  const uploadAndProcess = () => {
    const formData = new FormData();
    formData.append("file", file);
    submitForm("multipart/form-data", formData);
  };

  return (
    <div>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src={"/transcription.png"}
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
            src={"/conversation.png"}
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
            src={"/keywords.png"}
          />
        </Grid>
        <Grid container item xs={10}>
          Discover keywords and topics in your calls using semantic indexing.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img style={{ width: "150px", height: "150px" }} src={"/spot.png"} />
        </Grid>
        <Grid container item xs={10}>
          Spot keywords and phrases important to your business brand.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img
            style={{ width: "150px", height: "150px" }}
            src={"/predict.png"}
          />
        </Grid>
        <Grid container item xs={10}>
          Predict leads and prospects, customer churn, detect appointments,
          estimates and orders.
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <img style={{ width: "150px", height: "150px" }} src={"/swear.png"} />
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
          <input type="file" name="file" onChange={onChangeHandler} />
        </Grid>
      </Grid>
      <div style={{ height: "70px" }} />
      <Grid container justify="center">
        <Button variant="contained" color="primary" onClick={uploadAndProcess}>
          Process
        </Button>
      </Grid>
      <div style={{ height: "70px" }} />
      {transcription ? (
        <Grid container justify="center">
          <Grid container justify="center">
            <Typography variant="h2">Your transcription</Typography>
          </Grid>
          <div style={{ height: "70px" }}>{transcription}</div>
        </Grid>
      ) : null}
    </div>
  );
}
