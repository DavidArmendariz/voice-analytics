const convertDataForBars = (documents, key, max) => {
  const extractedKeys = {};
  documents.forEach((document) => {
    const keys = Object.keys(document[key]);
    keys.forEach((keyName) => {
      if (keyName in extractedKeys) {
        extractedKeys[keyName] += 1;
      } else {
        extractedKeys[keyName] = 1;
      }
    });
  });
  const data = Object.entries(extractedKeys).map((key) => ({
    name: key[0],
    frequency: key[1],
  }));
  data.sort((a, b) =>
    a.frequency > b.frequency ? -1 : b.frequency > a.frequency ? 1 : 0
  );
  if (max) {
    return data.slice(0, max);
  } else {
    return data;
  }
};

export default convertDataForBars;
