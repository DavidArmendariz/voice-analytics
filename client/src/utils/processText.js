import getKeywords from "utils/getKeywords";

const languageCode = "en";

const processText = async (text) => {
  try {
    let keywords = await getKeywords(text, languageCode);
    keywords = keywords.data;
    return keywords;
  } catch (error) {
    console.log(error);
  }
};

export default processText;
