const transformDataForSimpleLineChart = (documents, xAxisDataKey, series) => {
  return documents.map(document => {
    let extractedKeys;
    if (xAxisDataKey === "date") {
      extractedKeys = { [xAxisDataKey]: document[xAxisDataKey].toDate() };
    } else {
      extractedKeys = { [xAxisDataKey]: document[xAxisDataKey] };
    }
    series.forEach(key => (extractedKeys[key] = document[key]));
    return extractedKeys;
  });
};

export default transformDataForSimpleLineChart;
