const convertDataForWordCloud = (data, type) => {
  const words = {};
  data.forEach((document) => {
    Object.entries(document[type]).forEach((pair) => {
      const [key, value] = pair;
      if (key in words) {
        words[key] += value;
      } else {
        words[key] = value;
      }
    });
  });
  return Object.entries(words).map((pair) => {
    const [text, value] = pair;
    return { text, value };
  });
};

export default convertDataForWordCloud;
