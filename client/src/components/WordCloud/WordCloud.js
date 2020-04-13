import React from "react";
import WordCloud from "react-d3-cloud";

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

const WordCloud = ({words}) => {
  return (
    <WordCloud data={words} fontSizeMapper={fontSizeMapper} rotate={rotate} />
  );
};

export default WordCloud;
