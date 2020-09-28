const sumDocuments = (data, key, calculateAverage = false) => {
  const sum = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue[key],
    0
  );
  return calculateAverage ? (sum / data.length).toFixed(2) : sum.toFixed(2);
};

export default sumDocuments;
