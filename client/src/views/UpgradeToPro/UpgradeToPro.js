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

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  const [text, setText] = React.useState("Your text goes here");
  const [metadata, setMetadata] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await processText(text);
    setMetadata({ keywords: Object.keys(response).join(", ") });
  };
  const onChangeHandler = (event) => {
    const { value } = event.currentTarget;
    setText(value);
  };
  console.log(text);
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
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder={text}
            rowsMin={10}
            style={{ width: "900px" }}
            onChange={onChangeHandler}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Analyze now
          </Button>
        </form>
      </Grid>
      {metadata && (
        <Grid container justify="center">
          <ProcessingInfo
            data={metadata}
            options={{
              title: "This is your result",
              subtitles: { keywords: "Keywords" },
              units: {},
            }}
          />
        </Grid>
      )}
    </div>
  );
}
