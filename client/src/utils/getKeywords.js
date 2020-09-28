import axios from "axios";
const getKeywords = (transcription, languageCode) => {
  return axios({
    url: "http://0.0.0.0:8080/get_keywords",
    method: "POST",
    data: {
      transcription,
      languageCode,
    },
    headers: {
      Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
    },
  });
};

export default getKeywords;
