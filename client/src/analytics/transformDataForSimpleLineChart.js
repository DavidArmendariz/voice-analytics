import moment from "moment";

const transformDataForSimpleLineChart = (documents, xAxisDataKey, series) => {
  return documents.map(document => {
    let extractedKeys;
    if (xAxisDataKey === "date") {
      extractedKeys = {
        [xAxisDataKey]: moment(document[xAxisDataKey].toDate()).format("DD/MM/YYYY")
      };
    } else {
      extractedKeys = { [xAxisDataKey]: document[xAxisDataKey] };
    }
    series.forEach(key => (extractedKeys[key] = document[key]));
    return extractedKeys;
  });
};

export default transformDataForSimpleLineChart;
