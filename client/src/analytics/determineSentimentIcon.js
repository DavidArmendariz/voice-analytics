import React from "react";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const determinateSentimentIcon = (score) => {
  if (score > -0.3 && score < 0.3) {
    return <SentimentSatisfiedIcon />;
  } else if (score <= -0.3) {
    return <SentimentVeryDissatisfiedIcon />;
  } else if (score >= 0.3) {
    return <SentimentVerySatisfiedIcon />;
  }
};

export default determinateSentimentIcon;
