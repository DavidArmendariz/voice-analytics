const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const extractKeywords = data => {
  const keywordsArray = [];
  data.forEach(document => {
    const keywordPairs = Object.entries(document["keywords"]);
    keywordPairs.forEach(keywordPair => {
      keywordsArray.push({ text: keywordPair[0], value: getRandomInt(100) });
    });
  });
  return keywordsArray;
};

export default extractKeywords;
