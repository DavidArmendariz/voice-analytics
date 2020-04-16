const sumDocuments = (data, key, calculateAverage = false) => {
  const sum = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue[key],
    0
  );
  return calculateAverage ? sum / data.length : sum;
};

export default sumDocuments;
