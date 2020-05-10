import React from "react";
import { default as Words } from "react-d3-cloud";

// we add +1 to word.value to avoid getting 0
const fontSizeMapper = (word) => Math.log2(word.value + 1) * 20;
const rotate = (word) => word.value % 360;

const WordCloud = ({ words, maxWords = 50 }) => {
  let dataWords = words.sort((a, b) => {
    if (a.value < b.value) {
      return 1;
    }
    if (a.value > b.value) {
      return -1;
    }
    return 0;
  });
  dataWords = dataWords.slice(0, maxWords);
  console.log(dataWords);
  return (
    <Words
      data={dataWords}
      fontSizeMapper={fontSizeMapper}
      rotate={rotate}
      width={500}
      height={500}
    />
  );
};

export default WordCloud;
