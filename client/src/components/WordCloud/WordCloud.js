import React from "react";
import { default as Words } from "react-d3-cloud";

// we add +1 to word.value to avoid getting 0
const fontSizeMapper = word => Math.log2(word.value + 1) * 20;
const rotate = word => word.value % 360;

const WordCloud = ({ words }) => {
  return <Words data={words} fontSizeMapper={fontSizeMapper} rotate={rotate} width={500} height={500} />;
};

export default WordCloud;
