import determineUnitsOfTime from "analytics/determineUnitsOfTime";
import convertDataForLine from "analytics/convertDataForLine";
import sumDocuments from "analytics/sumDocuments";
import convertDataForWordCloud from "analytics/convertDataForWordCloud";
import convertDataForBars from "analytics/convertDataForBars";
import determinateSentimentIcon from "analytics/determineSentimentIcon";

const MAX_ELEMENTS_IN_BARS = 10;

const processAnalytics = (data) => {
  const audioLength =
    data.length && determineUnitsOfTime(sumDocuments(data, "audioLength"));
  const averageAudioLength =
    data.length &&
    determineUnitsOfTime(sumDocuments(data, "audioLength", true));
  const averageSentimentScore =
    data.length &&
    sumDocuments(
      data.map((doc) => doc["sentiment"]),
      "documentSentimentScore",
      true
    );
  const rows =
    data.length &&
    data.map(({ date, transcription, categories, keywords, sentiment }) => ({
      date: date.toDate().toLocaleDateString(),
      transcription,
      categories: Object.keys(categories).join(", "),
      keywords: Object.keys(keywords).join(", "),
      sentiment: determinateSentimentIcon(sentiment.documentSentimentScore),
    }));
  const exportedRows =
    data.length &&
    data.map(({ date, transcription, categories, keywords, sentiment }) => {
      return [
        date.toDate().toLocaleDateString(),
        transcription,
        Object.keys(categories).join(", "),
        Object.keys(keywords).join(", "),
        sentiment.documentSentimentScore,
      ];
    });
  const audioLengthInTime =
    data.length && convertDataForLine(data, "date", ["audioLength"]);
  const averageAudioLenghtInTime =
    data.length && convertDataForLine(data, "date", ["audioLength"], true);
  const keywords = data.length && convertDataForWordCloud(data, "keywords");
  const categories = data.length && convertDataForWordCloud(data, "categories");
  const frequencyCategories =
    data.length && convertDataForBars(data, "categories", MAX_ELEMENTS_IN_BARS);
  const frequencyKeywords = convertDataForBars(
    data,
    "keywords",
    MAX_ELEMENTS_IN_BARS
  );
  return {
    audioLength,
    averageAudioLength,
    averageSentimentScore,
    rows,
    exportedRows,
    audioLengthInTime,
    averageAudioLenghtInTime,
    keywords,
    categories,
    frequencyCategories,
    frequencyKeywords,
  };
};

export default processAnalytics;
