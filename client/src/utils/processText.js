import getKeywords from "utils/getKeywords";
import getTranslation from "./getTranslation";
import {
  keywordsCodes,
  contentClasifficationCodes,
  sentimentAnalysisCodes,
} from "../constants/languages";
import getCategories from "./getCategories";
import getSentiment from "./getSentiment";

const english = "en";

const processText = async (text) => {
  try {
    // Request detected language + translation
    const requestTranslation = await getTranslation(text);
    const { detectedLanguage, translation } = requestTranslation.data;
    // Request keywords
    let requestKeywords;
    if (!keywordsCodes.includes(detectedLanguage)) {
      requestKeywords = await getKeywords(translation, english);
    } else {
      requestKeywords = await getKeywords(text, detectedLanguage);
    }
    const keywords = requestKeywords.data;
    // Content classifier
    let requestCategories;
    if (!contentClasifficationCodes.includes(detectedLanguage)) {
      requestCategories = await getCategories(translation);
    } else {
      console.log(text);
      requestCategories = await getCategories(text);
    }
    const categories = requestCategories.data;
    // Sentiment Analysis
    let requestSentiment;
    if (!sentimentAnalysisCodes.includes(detectedLanguage)) {
      requestSentiment = await getSentiment(translation, english);
    } else {
      requestSentiment = await getSentiment(text, detectedLanguage);
    }
    const {
      documentSentimentScore,
      documentSentimentMagnitude,
    } = requestSentiment.data;

    // Data to be returned
    const data = {
      keywords,
      categories,
      documentSentimentScore,
      documentSentimentMagnitude,
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default processText;
