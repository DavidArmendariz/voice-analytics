const convertDataForWordCloud = (data, type) => {
  const keywordsArray = [];
  data.forEach(document => {
    const keywordPairs = Object.entries(document[type]);
    keywordPairs.forEach(keywordPair => {
      keywordsArray.push({ text: keywordPair[0], value: keywordPair[1] });
    });
  });
  return keywordsArray;
};

export default convertDataForWordCloud;
