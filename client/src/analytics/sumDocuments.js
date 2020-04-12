const sumDocuments = (data, key) => {
  return data.reduce(
    (accumulator, currentValue) => accumulator + currentValue[key],
    0
  );
};

export default sumDocuments;
