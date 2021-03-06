/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import processText from "utils/processText";
import ProcessingInfo from "components/ProcessingInfo/ProcessingInfo";
import CustomTable from "components/CustomTable/CustomTable";
import { connect } from "react-redux";
import { openSnackbar } from "../../redux/snackbarstatus/snackbarstatus.actions";
import Loader from "react-loader-spinner";

const useStyles = makeStyles(styles);

const UpgradeToPro = ({ openSnackbar }) => {
  const classes = useStyles();
  const [text, setText] = React.useState("Your text goes here");
  const [metadata, setMetadata] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    try {
      const response = await processText(text);
      setMetadata({
        keywords: Object.keys(response.keywords).join(", "),
        categories: Object.keys(response.categories).join(", "),
        score: response.documentSentimentScore.toFixed(2),
        magnitude: response.documentSentimentMagnitude.toFixed(2),
        entities: response.entities,
      });
    } catch (error) {
      console.log(error);
      openSnackbar("Something went wrong", "error");
    } finally {
      setIsProcessing(false);
    }
  };
  const onChangeHandler = (event) => {
    const { value } = event.currentTarget;
    setText(value);
  };
  return (
    <div>
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <Typography variant="h2" gutterBottom>
            We can analyze every kind of text too!
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid item>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder={text}
              rowsMin={10}
              style={{ width: "900px" }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Analyze now
          </Button>
        </form>
      </Grid>
      {isProcessing && (
        <div style={{ height: "500px" }}>
          <Grid container item justify="center">
            <Loader type="Oval" color="#6a0dad" />
          </Grid>
        </div>
      )}
      {metadata && (
        <Grid container justify="center">
          <ProcessingInfo
            data={metadata}
            options={{
              title: "This is your result",
              subtitles: {
                keywords: "Keywords",
                categories: "Categories",
                score: "Score",
                magnitude: "Magnitude",
              },
              units: {},
            }}
          />
        </Grid>
      )}
      {metadata ? (
        <CustomTable
          headers={[
            "Entity type",
            "Entity",
            "Relevance",
            "Magnitude",
            "Sentiment Score",
          ]}
          rows={metadata.entities}
        />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openSnackbar: (message, severity) =>
    dispatch(openSnackbar(message, severity)),
});

export default connect(null, mapDispatchToProps)(UpgradeToPro);
