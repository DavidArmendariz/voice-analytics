import React from "react";
import {default as Words} from "react-d3-cloud";

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

const WordCloud = ({words}) => {
  return (
    <Words data={words} fontSizeMapper={fontSizeMapper} rotate={rotate} />
  );
};

export default WordCloud;
