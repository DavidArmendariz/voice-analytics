import axios from "axios";

const getEntities = (text, languageCode) => {
  return axios({
    url: "http://0.0.0.0:8080/get_entity_sentiment",
    method: "POST",
    data: {
      text,
      languageCode,
    },
    headers: {
      Authorization: "Bearer 7a8af36b34fa7e01e0d5d16c48e93f68",
    },
  });
};

export default getEntities;
