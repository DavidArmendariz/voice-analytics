import moment from "moment";
import * as R from "ramda";

const { pipe, groupBy, prop, values } = R;

// TODO: refactor this with Ramda
const applyOperation = (groups, xAxis, series, applyAverage) => {
  return groups.map((group) => {
    const result = { [xAxis]: group[0][xAxis] };
    group.forEach((document) => {
      series.forEach((property) => {
        if (property in result) {
          result[property] += document[property];
        } else {
          result[property] = document[property];
        }
      });
    });
    if (applyAverage) {
      series.forEach(
        (property) => (result[property] = result[property] / group.length)
      );
    }
    return result;
  });
};

const groupByKey = (group) => {
  return pipe(groupBy(prop(group)), values);
};

// Right now, this function only admits applyAverage as an optional argument.
// It is easy to add another operation (e.g. standard deviation)
const convertDataForLine = (
  documents,
  xAxis,
  series,
  applyAverage = false
) => {
  const data = documents.map((document) => {
    const extractedKeys =
      xAxis === "date"
        ? { [xAxis]: moment(document[xAxis].toDate()).format("DD/MM/YYYY") }
        : { [xAxis]: document[xAxis] };
    series.forEach((key) => (extractedKeys[key] = document[key]));
    return extractedKeys;
  });
  const groups = groupByKey("date")(data);
  return applyOperation(groups, "date", series, applyAverage);
};

export default convertDataForLine;
