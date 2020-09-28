import axios from "axios";

const getTranslation = (transcription) => {
  return axios({
    url: "http://0.0.0.0:8080/get_translation",
    method: "POST",
    data: {
      transcription,
    },
    headers: {
      Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
    },
  });
};

export default getTranslation;
