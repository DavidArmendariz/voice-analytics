import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const SimpleCard = ({ title, content, units, children }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        {children ? (
          <>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>
            {children}
          </>
        ) : (
          <>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Grid container justify="center">
              <Typography variant="h4">
                {content} {units}
              </Typography>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleCard;
